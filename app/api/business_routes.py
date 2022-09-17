from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def get_all_businesses():

    businesses = Business.query.all()

    biz_lst = []
    for business in businesses: 
        category = Category.query.get(business.id)
        dict_business= business.to_dict()
        dict_business['category'] = category.category
        biz_lst.append(dict_business)

    return {'businesses': [business for business in biz_lst]}

@business_routes.route('/current')
@login_required
def get_businesses_of_current_user():
    businesses = Business.query.filter(Business.owner_id == current_user.id).all()

    biz_lst = []

    for business in businesses:
        category = Category.query.get(business.id)
        dict_business= business.to_dict()
        dict_business['category'] = category.category
        biz_lst.append(dict_business)

    return {'businesses': [business for business in biz_lst]}

@business_routes.route('/<int:id>')
def get_business_by_id(id):

    # get biz by id and convert it to a dict
    business = Business.query.get(id)
    dict_business= business.to_dict()

    # get the category of the biz and add the k/v pair
    category = Category.query.get(id)
    dict_business['category'] = category.category

    # get all the images associated to the biz and add them as k/v pair list
    image_lst = []
    images = Image.query.filter(Image.business_id == id).all()
    for image in images: 
        dict_image = image.to_dict()
        image_lst.append(dict_image)
    dict_business['Images'] = image_lst

    # get the owner info and add it as a k/v pair
    owner = (User.query.filter(User.id == business.owner_id).one()).to_dict()
    dict_business['Owner'] = owner

    # get all the reviews and add them in as list as a k/v pair
    review_lst = []
    reviews = Review.query.filter(Review.business_id == id).all()
    for review in reviews:
        dict_review = review.to_dict()
        review_lst.append(dict_review)
    dict_business['Reviews'] = review_lst

    # add the amenities as a k/v pair to the biz
    amenities_lst = []
    for amenity in business.amenities:
        amenities_lst.append(amenity.description)
    dict_business['Amenities'] = amenities_lst

    return dict_business
