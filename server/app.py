#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Charity, User, Donation, CharityReview, BlogPost


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Charities(Resource):
    def get(self):
        charities = [charity.to_dict(rules=("-reviews",)) for charity in Charity.query.all()]
        return charities, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_charity = Charity(
                charity_name=json.get("charity_name"),
                charity_description=json.get("charity_description"),
                charity_location=json.get("charity_location")
            )
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
        user = [users.to_dict(rules=("-reviews",)) for users in User.query.all()]
        return user, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_user = User(
                username=json.get("username"),
                user_icon=json.get("userImg"),
                _password_hash=json.get("password"),
                email=json.get("email")
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201 
        except ValueError:
            return {
                "errors": ["validation errors"]
            }, 400


class UsersId(Resource):
    def get(self, id):
        user = User.query.filter(User.id==id).first()
        if user:
            return make_response(user.to_dict(rules=("-donations.charity.reviews", "-donations.charity.charity_signup", "-donations.charity.charity_name", "donations.charity.charity_name", "-donations.charity.charity_location",  "-donations.charity_id", "-donations.date_of_donation", "-donations.id", "-donations.user_id", "-donations.charity.charity_description",  "-reviews.charity",)), 200)
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


class Reviews(Resource):
    def get(self):
        review = [reviews.to_dict(rules=("-charity", "-user",)) for reviews in CharityReview.query.all()]
        return review, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_review = CharityReview(
                charity_review=json.get("charity_review"),
                user_id=json.get("user_id"),
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

class Blog(Resource):
    def get(self):
        blogs = [blog.to_dict() for blog in BlogPost.query.all()]
        return blogs, 200

class BlogById(Resource):
    def get(self, id):
        blogs = BlogPost.query.filter(BlogPost.id==id).first()
        if blogs:
            return make_response(blogs.to_dict(rules=("-charity.charity_description", 
                 "-charity.charity_location", "-charity.charity_signup",)), 200)
        return {
            "error": "charity not found"
        }, 404

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username)

        password = request.get_json()['userPassword']
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': 'Invalid username or password'}, 401

    
api.add_resource(Charities, "/charities")
api.add_resource(CharityId, "/charities/<int:id>")
api.add_resource(Users, '/users')
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewsId, '/reviews/<int:id>')
api.add_resource(Blog, '/blogs')
api.add_resource(BlogById, '/blogs/<int:id>')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)




# #!/usr/bin/env python3

# # Standard library imports
# import json

# # Remote library imports
# from flask import request, make_response, session
# from flask_restful import Resource
# from werkzeug.security import check_password_hash

# # Local imports
# from config import app, db, api
# # Add your model imports
# from models import Charity, User, Donation, CharityReview, BlogPost

# # Ensure you have a secret key for session management
# app.secret_key = 'your_secret_key'  # Use a strong and unique secret key

# # Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

# class Charities(Resource):
#     def get(self):
#         charities = [charity.to_dict(rules=("-reviews",)) for charity in Charity.query.all()]
#         return charities, 200
    
#     def post(self):
#         json = request.get_json()
#         try:
#             new_charity = Charity(
#                 charity_name=json.get("charity_name"),
#                 charity_description=json.get("charity_description"),
#                 charity_location=json.get("charity_location")
#             )
#             db.session.add(new_charity)
#             db.session.commit()
#             return new_charity.to_dict(), 201
#         except ValueError:
#             return {
#                 "errors": ["validation errors"]
#             }, 400

# class CharityId(Resource):
#     def get(self, id):
#         charity_info = Charity.query.filter(Charity.id==id).first()
#         if charity_info:
#             return make_response(charity_info.to_dict(rules=("-donations.user._password_hash", "-reviews.user._password_hash", "-blogs.charity",)), 201)
#         return {
#             "errors": "charity not found"
#         }
    
#     def patch(self, id):
#         data = request.get_json()
#         charity_review_info = CharityReview.query.filter(CharityReview.id==id).first()
#         if charity_review_info:
#             try:
#                 for attr in data:
#                     setattr(charity_review_info, attr, data[attr])
#                 db.session.add(charity_review_info)
#                 db.session.commit()
#                 return make_response(charity_review_info.to_dict(), 202)
#             except ValueError:
#                 return {
#                     "errors": ["validation errors"]
#                 }, 400
#         return {
#             "error": "Review not found"
#         }, 404

# class Users(Resource):
#     def get(self):
#         user = [users.to_dict(rules=("-reviews",)) for users in User.query.all()]
#         return user, 200
    
#     def post(self):
#         json = request.get_json()
#         try:
#             new_user = User(
#                 username=json.get("username"),
#                 user_icon=json.get("user_icon"),
#                 _password_hash=json.get("password"),
#                 email=json.get("email")
#             )
#             db.session.add(new_user)
#             db.session.commit()
#             return new_user.to_dict(), 201 
#         except ValueError:
#             return {
#                 "errors": ["validation errors"]
#             }, 400

# class UsersId(Resource):
#     def get(self, id):
#         user = User.query.filter(User.id==id).first()
#         if user:
#             return make_response(user.to_dict(rules=("-donations.charity.reviews", "-donations.charity.charity_signup", "-donations.charity.charity_name", "donations.charity.charity_name", "-donations.charity.charity_location",  "-donations.charity_id", "-donations.date_of_donation", "-donations.id", "-donations.user_id", "-donations.charity.charity_description",  "-reviews.charity",)), 200)
#         return {
#             "error": "user not found"
#         }, 404
    
#     def patch(self, id):
#         data=request.get_json()
#         updated_user = User.query.filter(User.id==id).first()
#         if updated_user:
#             try:
#                 for attr in data:
#                     setattr(user, attr, data[attr])
#                 db.session.add(updated_user)
#                 db.session.commit()
#                 return make_response(updated_user.to_dict(), 202)
#             except ValueError:
#                 return {
#                     "errors": ["Validation error"]
#                 }, 400
#         return {
#             "error": "User doesn't exist"
#         }, 404

# class Reviews(Resource):
#     def get(self):
#         review = [reviews.to_dict(rules=("-charity", "-user",)) for reviews in CharityReview.query.all()]
#         return review, 200
    
#     def post(self):
#         json = request.get_json()
#         try:
#             new_review = CharityReview(
#                 charity_review=json.get("charity_review"),
#                 user_id=json.get("user_id"),
#                 charity_id=json.get("charity_id")
#             )
#             db.session.add(new_review)
#             db.session.commit()
#             return new_review.to_dict(), 201
#         except ValueError:
#             return {
#                 "error": ["validation error"]
#             }, 400

# class ReviewsId(Resource):
#     def get(self, id):
#         reviews = CharityReview.query.filter(CharityReview.id==id).first()
#         if reviews:
#             return make_response(reviews.to_dict(rules=("-user._password_hash",)), 200)
#         return {
#             "errors": "charity not found"
#         }, 404
    
#     def patch(self, id):
#         data=request.get_json()
#         updated_review = CharityReview.query.filter(CharityReview.id==id).first()
#         if updated_review:
#             try:
#                 for attr in data:
#                     setattr(updated_review, attr, data[attr])
#                 db.session.add(updated_review)
#                 db.session.commit()
#                 return make_response(updated_review.to_dict(), 202)
#             except ValueError:
#                 return {
#                     "error": ["Validation error"]
#                 }, 400
#         return {
#             "error": "Review not found"
#         }, 404

# class Blog(Resource):
#     def get(self):
#         blogs = [blog.to_dict() for blog in BlogPost.query.all()]
#         return blogs, 200

# class BlogById(Resource):
#     def get(self, id):
#         blogs = BlogPost.query.filter(BlogPost.id==id).first()
#         if blogs:
#             return make_response(blogs.to_dict(rules=("-charity.charity_description", 
#                  "-charity.charity_location", "-charity.charity_signup",)), 200)
#         return {
#             "error": "charity not found"
#         }, 404

# class Login(Resource):
#     def post(self):
#         json = request.get_json()
#         username = json.get('username')
#         password = json.get('userPassword')
        
#         user = User.query.filter(User.username == username).first()
        
#         if user:
#             if check_password_hash(user._password_hash, password):
#                 session['user_id'] = user.id
#                 return user.to_dict(), 200
#             else:
#                 app.logger.warning(f'Authentication failed for user: {username} (invalid password)')
#                 return {'error': 'Invalid username or password'}, 401
#         else:
#             app.logger.warning(f'Authentication failed for user: {username} (user not found)')
#             return {'error': 'Invalid username or password'}, 401
    
# api.add_resource(Charities, "/charities")
# api.add_resource(CharityId, "/charities/<int:id>")
# api.add_resource(Users, '/users')
# api.add_resource(UsersId, '/users/<int:id>')
# api.add_resource(Reviews, '/reviews')
# api.add_resource(ReviewsId, '/reviews/<int:id>')
# api.add_resource(Blog, '/blogs')
# api.add_resource(BlogById, '/blogs/<int:id>')
# api.add_resource(Login, '/login')

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)



