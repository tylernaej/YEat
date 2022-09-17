from crypt import methods
from xml.dom import ValidationErr
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from app.forms.business_form import CreateBusinessForm

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def get_all_businesses():

    category = request.args.get('category')

    
    if category:
        cat_query_result = Category.query.filter(Category.category.ilike(f'%{category}%')).all()
        
        categories_lst = []
        for category in cat_query_result:
            dict_category = category.to_dict()
            categories_lst.append(dict_category)

        business_lst = []
        for category in categories_lst:
            businesses = Business.query.filter(Business.categories)


    businesses = Business.query.all()

    biz_lst = []
    for business in businesses: 
        dict_business= business.to_dict()
        category_lst = []
        for category in business.categories:
            category_lst.append(category.category)
        dict_business['categories'] = category_lst
        biz_lst.append(dict_business)

    return {'businesses': [business for business in biz_lst]}

@business_routes.route('/current')
@login_required
def get_businesses_of_current_user():
    businesses = Business.query.filter(Business.owner_id == current_user.id).all()

    if not businesses:
        return {"message":"You don't have any businesses!","statusCode": 404}

    biz_lst = []

    for business in businesses:
        dict_business= business.to_dict()
        category_lst = []
        for category in business.categories:
            category_lst.append(category.category)
        dict_business['categories'] = category_lst
        biz_lst.append(dict_business)
    

    return {'businesses': [business for business in biz_lst]}

@business_routes.route('/<int:id>')
def get_business_by_id(id):

    # get biz by id and convert it to a dict
    business = Business.query.get(id)

    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    dict_business= business.to_dict()

    # get the category of the biz and add the k/v pair
    category_lst = []
    for category in business.categories:
        category_lst.append(category.category)
    dict_business['categories'] = category_lst

    # get all the images associated to the biz and add them as k/v pair list
    image_lst = []
    images = Image.query.filter(Image.business_id == id).all()
    for image in images: 
        dict_image = image.to_dict()
        image_lst.append(dict_image)
    dict_business['images'] = image_lst

    # get the owner info and add it as a k/v pair
    owner = (User.query.filter(User.id == business.owner_id).one()).to_dict()
    dict_business['owner'] = owner

    # get all the reviews and add them in as list as a k/v pair
    review_lst = []
    reviews = Review.query.filter(Review.business_id == id).all()
    for review in reviews:
        dict_review = review.to_dict()
        review_lst.append(dict_review)
    dict_business['reviews'] = review_lst

    # add the amenities as a k/v pair to the biz
    amenities_lst = []
    for amenity in business.amenities:
        amenities_lst.append(amenity.description)
    dict_business['amenities'] = amenities_lst

    return dict_business

@business_routes.route('/<int:id>/reviews')
def get_reviews_by_business_id(id):

    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    reviews = Review.query.filter(Review.business_id == id).all()
    images = Image.query.all()

    images_lst = [image.to_dict() for image in images]

    reviews_lst = []
    for review in reviews:
        dict_review = review.to_dict()
        for image in images_lst:
            if image['reviewId'] == review.id:
                dict_review['images'] = image
        reviews_lst.append(dict_review)

    return {'Reviews': reviews_lst}


@business_routes.route('/<int:id>/amenities')
def get_amenities_by_business_id(id):

    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    amenities_lst = []
    for amenity in business.amenities:
        amenities_lst.append(amenity.description)
    
    return {'amenities': amenities_lst}


@business_routes.route('', methods=['POST'])
@login_required
def create_a_business():
    form = CreateBusinessForm()
    # data = request.form
    # print('\n\n\n\n', form.data, '\n\n\n\n')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business(
            owner_id = current_user.id,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
            country = form.country.data,
            zipcode = form.zipcode.data,
            latitude = form.latitude.data,
            longitude = form.longitude.data,
            description = form.description.data,
            price_range = form.priceRange.data,
            email = form.email.data,
            phone = form.phone.data,
            name = form.name.data,
            website = form.website.data
        )
        # print('TEST 2', business.to_dict())
        db.session.add(business)
        db.session.commit()
        # print('\n\n\n\n', business.to_dict(), '\n\n\n\n')
        return business.to_dict()
    print(form.errors)
    errors = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": form.errors
    }
    return errors