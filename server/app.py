#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, render_template, url_for
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Charity, User, Donation, CharityReview, BlogPost
from sqlalchemy import event




# Views go here!

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/favicon.ico")
def favicon():
    return url_for('static', filename='data:,')

class Charities(Resource):
    def get(self):
        charities = [charity.to_dict(rules=("-reviews", "-donations", "-blogs",)) for charity in Charity.query.all()]
        return charities, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_charity = Charity(
                charity_name=json.get("charityName"),
                charity_description=json.get("charityDescription"),
                charity_location=json.get("charityLocation"),
                charity_icon = json.get("charityIcon")
            )
            new_charity.password_hash=json.get("charityPassword")
            db.session.add(new_charity)
            db.session.commit()
            return new_charity.to_dict(), 201
        #Try be more specific with error message later
        except ValueError:
            return {
                "errors": ["validation errors"]
            }, 400


class CharityId(Resource):
    def get(self, id):
        charity_info = Charity.query.filter(Charity.id==id).first()
        if charity_info:
            return make_response(charity_info.to_dict(rules=("-donations.user._password_hash", "-reviews.user._password_hash", "-blogs.charity",)), 201)
        return {
            "errors": "charity not found"
        }
    
    def patch(self, id):
        data = request.get_json()
        charity_review_info = CharityReview.query.filter(CharityReview.id==id).first()
        if charity_review_info:
            try:
                for attr in data:
                    setattr(charity_review_info, attr, data[attr])
                db.session.add(charity_review_info)
                db.session.commit()
                return make_response(charity_review_info.to_dict(), 202)
            except ValueError:
                return {
                    "errors": ["validation errors"]
                }, 400
        return {
            "error": "Review not found"
        }, 404


class Users(Resource):
    def get(self):
        user = [users.to_dict(rules=("-reviews", "-blogs", "-donations", "-_password_hash",)) for users in User.query.all()]
        return user, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_user = User(
                username=json.get("username"),
                user_icon=json.get("userImg"),
                email=json.get("email")
            )
            new_user.password_hash=json.get("password")
            
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201 
        except ValueError:
            return {
                "errors": ["validation errors"]
            }, 400


class UsersId(Resource):
    def get(self, id):
        user = User.query.filter(User.id==id).first()
        if user:
            return make_response(user.to_dict(rules=("-donations.charity.reviews", "-donations.charity.charity_signup", "-donations.charity.charity_name", "donations.charity.charity_name", "-donations.charity.charity_location",  "-donations.charity_id", "-donations.date_of_donation", "-donations.id", "-donations.user_id", "-donations.charity.charity_description",  "-donations.amount_donated", "-reviews.charity", "-donations.charity._password_hash",)), 200)
        return {
            "error": "user not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        updated_user = User.query.filter(User.id==id).first()
        if updated_user:
            try:
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.add(updated_user)
                db.session.commit()
                return make_response(updated_user.to_dict(), 202)
            except ValueError:
                return {
                    "errors": ["Validation error"]
                }, 400
        return {
            "error": "User doesn't exist"
        }, 404

class Donations(Resource):
    def get(self):
        donation = [donations.to_dict() for donations in Donation.query.all()]
        return donation, 200
    
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return{"message": "Unauthorized user"}, 401

        json = request.get_json()
        try:
            new_donation = Donation(
                amount_donated = json.get("amount_donated"),
                user_id = user_id,
                charity_id = json.get("charity_id")
            )
            db.session.add(new_donation)
            db.session.commit()
            return new_donation.to_dict(), 201
        except ValueError:
            return {
                "error": ["Validation error"]
            }, 400

class Reviews(Resource):
    def get(self):
        review = [reviews.to_dict(rules=("-charity", "-user.email", "-user.signup_date", "-user.id", "-user._password_hash",)) for reviews in CharityReview.query.all()]
        return review, 200
    
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return{"message": "Unauthorized user"}, 401

        json = request.get_json()
        try:
            new_review = CharityReview(
                review_title=json.get("review_title"),
                charity_review=json.get("charity_review"),
                user_id=user_id,
                charity_id=json.get("charity_id")
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 201
        except ValueError:
            return {
                "error": ["validation error"]
            }, 400
        

class ReviewsId(Resource):
    def get(self, id):
        reviews = CharityReview.query.filter(CharityReview.id==id).first()
        if reviews:
            return make_response(reviews.to_dict(rules=("-user._password_hash",)), 200)
        return {
            "errors": "charity not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        updated_review = CharityReview.query.filter(CharityReview.id==id).first()
        if updated_review:
            try:
                for attr in data:
                    setattr(updated_review, attr, data[attr])
                db.session.add(updated_review)
                db.session.commit()
                return make_response(updated_review.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation error"]
                }, 400
        return {
            "error": "Review not found"
        }, 404

    def delete(self, id):
        review = CharityReview.query.filter(CharityReview.id == id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return{
                "message": "Review Deleted Successfully"
            }, 200
        return {
            "error": "Review not Found"
        }, 404

class Blog(Resource):
    def get(self):
        blogs = [blog.to_dict() for blog in BlogPost.query.all()]
        return blogs, 200
    
    def post(self):
        json_data = request.get_json()
        try:
            user_id = session.get("user_id")
            charity_id = session.get("charity_id")

            if user_id:
                new_blog = BlogPost(
                    blog_title=json_data.get("blog_title"),
                    blog_content = json_data.get("blog_content"),
                    cover_img = json_data.get("cover_img"),
                    blog_views = 0,
                    user_id = user_id,
                    # charity_id = json_data.get("charityId")
                )
                db.session.add(new_blog)
                db.session.commit()
                return new_blog.to_dict(), 201

            elif charity_id:
                new_blog = BlogPost(
                    blog_title=json_data.get("blog_title"),
                    blog_content = json_data.get("blog_content"),
                    cover_img = json_data.get("cover_img"),
                    blog_views = 0,
                    charity_id = charity_id
                )
                db.session.add(new_blog)
                db.session.commit()
                return new_blog.to_dict(), 201
        except ValueError:
            return {
                "error": ["Validation Error"]
            }, 400

class BlogById(Resource):
    def get(self, id):
        blogs = BlogPost.query.filter(BlogPost.id==id).first()
        if blogs:
            return make_response(blogs.to_dict(rules=("-charity.charity_description", 
                 "-charity.charity_location", "-charity.charity_signup",)), 200)
        return {
            "error": "charity not found"
        }, 404

    def patch(self, id):
        data=request.get_json()
        updated_blog = BlogPost.query.filter(BlogPost.id==id).first()
        if updated_blog:
            try:
                for attr in data:
                    setattr(updated_blog, attr, data[attr])
                db.session.add(updated_blog)
                db.session.commit()
                return make_response(updated_blog.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation error"]
                }, 400
        return {
            "error": "Blog not found"
        }, 404
    
    def delete(self, id):
        blog = BlogPost.query.filter(BlogPost.id == id).first()
        if blog:
            db.session.delete(blog)
            db.session.commit()
            return {
                "message": "Blog deleted successfully"
            }, 200
        return {
            "error": "Blog not found"
        }, 404

class CheckUserSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {"message": "Unauthorized user"}, 401

class CheckCharitySession(Resource):
    def get(self):
        charity_id = session.get('charity_id')
        if charity_id:
            charity = Charity.query.filter(Charity.id == charity_id).first()
            if charity:
                return charity.to_dict(), 200
        return {"message": "Unauthorized Charity"}, 401

class UserLogin(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get('usernameInput')
        password = json_data.get('userPassword')
        
        if not username or not password:
            return {'error': 'Username and password required'}, 400

        user = User.query.filter(User.username == username).first()
      
        
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401

class CharityLogin(Resource):
    def post(self):
        json_data = request.get_json()
        charity_name = json_data.get("charityNameInput")
        password = json_data.get("charityPassword")

        if not charity_name or not password:
            return {"error": "Charity Name and Password required"}, 400
        
        charity = Charity.query.filter(Charity.charity_name == charity_name).first()

        if charity and charity.authenticate(password):
            session['charity_id'] = charity.id 
            return charity.to_dict(), 200

        return {"error": "Invalid Charity Name or Password"}

class UserLogout(Resource):
    def delete(self):
        user_id=session.get('user_id')
        if user_id:
            session.pop('user_id')
            return {}, 204
        return {"message": "Unauthorized"}, 401

class CharityLogout(Resource):
    def delete(self):
        if session.get('charity_id'):
            session['charity_id'] = None
            return {}, 204
        return {"message": "Unauthorized"}, 401

class IncrementBlogViews(Resource):
    def post(self, id):
        blog = BlogPost.query.filter(BlogPost.id == id).first()
        if blog:
            blog.blog_views += 1
            db.session.commit()
            return blog.to_dict(), 200
        return {
            "error": "Blog not found"
        }, 404

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


    
api.add_resource(Charities, "/charities")
api.add_resource(CharityId, "/charities/<int:id>")
api.add_resource(Users, '/users')
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(ReviewsId, '/reviews/<int:id>')
api.add_resource(Blog, '/blogs')
api.add_resource(BlogById, '/blogs/<int:id>')
api.add_resource(UserLogin, '/userlogin', endpoint="userlogin")
api.add_resource(CharityLogin, '/charitylogin', endpoint="charitylogin")
api.add_resource(CheckUserSession, '/usercheck_session', endpoint='usercheck_session')
api.add_resource(CheckCharitySession, '/charitycheck_session')
api.add_resource(UserLogout, '/userlogout', endpoint='userlogout')
api.add_resource(CharityLogout, '/charitylogout')
api.add_resource(Donations, '/donations', endpoint='donations')
api.add_resource(IncrementBlogViews, '/blogs/<int:id>/increment-views')

if __name__ == '__main__':
    app.run(port=5555, debug=True)








