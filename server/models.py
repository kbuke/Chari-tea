from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt



class Charity(db.Model, SerializerMixin):
    __tablename__ = "charities"

    id = db.Column(db.Integer, primary_key=True)
    charity_name = db.Column(db.String, nullable=False, unique=True)
    charity_description = db.Column(db.String, nullable=False)
    charity_location = db.Column(db.String, nullable=False)
    charity_icon = db.Column(db.String, nullable=True)
    charity_signup = db.Column(db.DateTime, server_default=db.func.now())
    _password_hash = db.Column(db.String, nullable=False)

    #Add relationships
    donations = db.relationship("Donation", backref="charity", lazy=True)
    reviews = db.relationship("CharityReview", backref="charity", lazy=True)
    blogs = db.relationship("BlogPost", backref="charity", lazy=True)

    #Add serialize rules
    serialize_rules = ("-donations.charity", "-reviews.charity", "-blog_posts.charity",)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<Charity {self.id} => {self.charity_name} in {self.charity_location} {self.charity_description}'


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    user_icon = db.Column(db.String, nullable=True)
    signup_date = db.Column(db.DateTime, server_default=db.func.now())
    email = db.Column(db.String, nullable=False)

    #Add relationships
    donations = db.relationship("Donation", backref="user", lazy=True)
    reviews = db.relationship("CharityReview", backref="user", lazy=True)
    blogs = db.relationship("BlogPost", backref="user", lazy=True)

    #Add serialize rules
    serialize_rules = ("-donations.user", "-blog_posts.charity",)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
            

class Donation(db.Model, SerializerMixin):
    __tablename__ = "donations"

    id = db.Column(db.Integer, primary_key=True)
    amount_donated = db.Column(db.Float)
    date_of_donation = db.Column(db.DateTime, server_default=db.func.now())

    #Add relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"))

    #Serialize rules
    serialize_rules = ("-user.donations", "-user.reviews", "-user.blogs", "-charity.donations", "charity.reviews", "-charity.blogs",)

    #Add validations
    @validates("amount_donated")
    def validate_donation(self, key, amount):
        if 0 < amount:
            return amount 
        raise ValueError("The amount donated must be higher than £0.00")


class CharityReview(db.Model, SerializerMixin):
    __tablename__ = "charity_reviews"

    id = db.Column(db.Integer, primary_key=True)
    review_title = db.Column(db.String)
    charity_review = db.Column(db.String)
    review_date = db.Column(db.DateTime, server_default=db.func.now())

    #Add relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"))

    #Add serialization
    serialize_rules = ("-user.reviews", "-user.donations", "-user.blogs", "-charity.reviews", "-charity.donations", "-charity.blogs",)

class BlogPost(db.Model, SerializerMixin):
    __tablename__ = "blog_posts"

    id = db.Column(db.Integer, primary_key=True)
    blog_title = db.Column(db.String, nullable=False)
    blog_content = db.Column(db.String, nullable=False)
    blog_date = db.Column(db.DateTime, server_default=db.func.now())
    cover_img = db.Column(db.String, nullable=False)
    blog_views = db.Column(db.Integer)
    img1 = db.Column(db.String, nullable=True)
    img2 = db.Column(db.String, nullable=True)
    img3 = db.Column(db.String, nullable=True)
    img4 = db.Column(db.String, nullable=True)
    img5 = db.Column(db.String, nullable=True)

    #Add relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)

    #Serialize Rules
    serialize_rules = ("-user.blogs", "-user.donations", "-user.reviews", "-charity.blogs", "-charity.donations", "-charity.reviews",)

    #Add validation rules
    @validates('user_id', 'charity_id')
    def validate_user_or_charity(self, key, value):
        if key == 'user_id':
            other_value = self.charity_id
        else:
            other_value = self.user_id

        if value is None and other_value is None:
            raise ValueError("Either user_id or charity_id must be set.")
        return value

   



    




