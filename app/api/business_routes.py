from flask import Blueprint, request, Response, make_response, jsonify, abort
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review, business, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.business_form import CreateBusinessForm
from app.forms.review_form import ReviewForm
from app.forms.amenity_form import AddAmenityForm

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def get_all_businesses():

    category = request.args.get('category')
    name = request.args.get('name')

    print(f'\n\nin route {category}, {name} \n\n')
    if category or name:
        business_lst = []
        if category:
            cat_query_result = Category.query.filter(Category.category.ilike(f'%{category}%')).all()
            businesses = Business.query.all()

            categories_lst = []
            for category in cat_query_result:
                dict_category = category.to_dict()
                categories_lst.append(dict_category)
            for category1 in categories_lst:
                for business in businesses:
                    dict_business = business.to_dict()
                    biz_catetgory_lst = []
                    for category in dict_business['categories']:
                        dict_category = category.to_dict()
                        biz_catetgory_lst.append(dict_category['category'])
                    dict_business['categories'] = biz_catetgory_lst
                    if category1['category'] in dict_business['categories']:
                        business_lst.append(dict_business)
        if name:
            name_query_result = Business.query.filter(Business.name.ilike(f'%{name}%')).all()
            for business in name_query_result:
                dict_business = business.to_dict()
                biz_catetgory_lst = []
                for category in dict_business['categories']:
                    dict_category = category.to_dict()
                    biz_catetgory_lst.append(dict_category['category'])
                dict_business['categories'] = biz_catetgory_lst
                if dict_business not in business_lst:
                    business_lst.append(dict_business)

        print('\n\n',business_lst)
        return {'businesses': business_lst}


    businesses = Business.query.all()

    biz_lst = []
    for business in businesses:
        dict_business= business.to_dict()
        if business.reviews:
            dict_business["numReviews"] = len(business.reviews)
            dict_business["avgReviews"] = sum([review.rating for review in business.reviews]) / len(business.reviews)
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

    # if not businesses:
        # Response.status = 404
        # abort(404, "You don't have any businesses!")
        # return {"message":"You don't have any businesses!"}

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

    # get total reviews and avg
    if reviews:
        dict_business["numReviews"] = len(business.reviews)
        dict_business["avgReviews"] = sum([review.rating for review in business.reviews]) / len(business.reviews)




    # add the amenities as a k/v pair to the biz
    amenities_lst = []
    for amenity in business.amenities:
        amenities_lst.append(amenity.description)
    dict_business['amenities'] = amenities_lst

    return dict_business

@business_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def post_review_for_business(id):
    # query for business
    business = Business.query.get(id)

    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        review = Review(
            user_id = current_user.id,
            business_id = id,
            rating = form.rating.data,
            review = form.review.data
        )

        db.session.add(review)
        db.session.commit()
        # return the updated review
        return review.to_dict()

    # return errors if
    errors = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": form.errors
    }
    return errors



@business_routes.route('/<int:id>/reviews', methods=["GET"])
def get_reviews_by_business_id(id):

    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    reviews = Review.query.filter(Review.business_id == id).all()

    images = Image.query.all()
    images_lst = [image.to_dict() for image in images]

    users = User.query.all()
    users_lst = [user.to_dict() for user in users]

    print(f'\n\nusers list: {users_lst}\n\n')

    reviews_lst = []
    for review in reviews:
        dict_review = review.to_dict()
        for image in images_lst:
            if image['reviewId'] == review.id:
                dict_review['images'] = image
        for user in users_lst:
            if review.user_id == user['id']:
                owner = {}
                owner['firstName'] = user['firstName']
                owner['lastName'] = user['lastName']
                owner['profilePicture'] = user['profilePicture']
                dict_review['reviewer'] = owner
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
    # print(form.errors)
    errors = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": form.errors
    }
    return errors



@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_a_business(id):
    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    if business.owner_id != current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        business.owner_id = current_user.id
        business.address = form.address.data
        business.city = form.city.data
        business.state = form.state.data
        business.country = form.country.data
        business.zipcode = form.zipcode.data
        business.latitude = form.latitude.data
        business.longitude = form.longitude.data
        business.description = form.description.data
        business.price_range = form.priceRange.data
        business.email = form.email.data
        business.phone = form.phone.data
        business.name = form.name.data
        business.website = form.website.data

        db.session.commit()
        return business.to_dict()
    # print(form.errors)
    errors = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": form.errors
    }
    return errors

@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_a_business(id):
    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    if business.owner_id != current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    db.session.delete(business)
    db.session.commit()

    return {  "message": "Successfully deleted", "statusCode": 200}

@business_routes.route('<int:id>/amenities', methods=['POST'])
@login_required
def add_amenities_to_a_business(id):
    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    if business.owner_id != current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    form = AddAmenityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.freeWifi.data == True:
            business.amenities.append(form.freeWifi.data)

        if form.takeOut.data == True:
            business.amenities.append(form.takeOut.data)

        if form.dineIn.data == True:
            business.amenities.append(form.dineIn.data)

        if form.delivery.data == True:
            business.amenities.append(form.delivery.data)

        if form.vegetarianFriendly.data == True:
            business.amenities.append(form.vegetarianFriendly.data)

        if form.acceptsCreditCards.data == True:
            business.amenities.append(form.acceptsCreditCards.data)

        if form.acceptsApplePay.data == True:
            business.amenities.append(form.acceptsApplePay.data)

        if form.acceptsAndroidPay.data == True:
            business.amenities.append(form.acceptsAndroidPay.data)

        if form.publicRestrooms.data == True:
            business.amenities.append(form.publicRestrooms.data)

        if form.kidFriendly.data == True:
            business.amenities.append(form.kidFriendly.data)

        if form.outdoorSeating.data == True:
            business.amenities.append(form.outdoorSeating.data)

        if form.largeGroupFriendly.data == True:
            business.amenities.append(form.largeGroupFriendly.data)

        if form.offersCatering.data == True:
            business.amenities.append(form.offersCatering.data)

        if form.wheelchairAccessible.data == True:
            business.amenities.append(form.wheelchairAccessible.data)

        if form.dogsAllowed.data == True:
            business.amenities.append(form.dogsAllowed.data)

        if form.liveMusic.data == True:
            business.amenities.append(form.liveMusic.data)

        db.session.commit()
        return business.to_dict()

    return 'Failure to add amenities to business'



    




#ERROR HANDLERS
@business_routes.errorhandler(404)
def custom400(error):
    print('\n\n', error, '\n\n')
    response = jsonify({'message': str(error)})
    print('\n\n', response, '\n\n')
    response.status_code = 404
    return response
    # etc.

# abort(400, {'message': 'custom error message to appear in body'})
