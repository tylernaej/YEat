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
            dict_business["avgReviews"] = round(sum([review.rating for review in business.reviews]) / len(business.reviews), 2)
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
        dict_business["avgReviews"] = round(sum([review.rating for review in business.reviews]) / len(business.reviews), 2)




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
    print('\n\n\n\n', request.data, '\n\n\n\n')

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
    # print('\n\n\n\n', request, '\n\n\n\n')
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
        free_wifi = Amenity.query.get(1)
        take_out = Amenity.query.get(2)
        dine_in = Amenity.query.get(3)
        Delivery = Amenity.query.get(4)
        Reservations = Amenity.query.get(5)
        Vegetarian_friendly = Amenity.query.get(6)
        Accepts_Credit_Cards = Amenity.query.get(7)
        Accepts_Apple_Pay = Amenity.query.get(8)
        Accepts_Android_Pay = Amenity.query.get(9)
        Public_Restrooms = Amenity.query.get(10)
        Kid_friendly = Amenity.query.get(11)
        Outdoor_seating = Amenity.query.get(12)
        Large_group_friendly = Amenity.query.get(13)
        Offers_Catering = Amenity.query.get(14)
        Wheelchair_accessible = Amenity.query.get(15)
        Dogs_allowed = Amenity.query.get(16)
        Live_music = Amenity.query.get(17)
        print('\n\n\n\n',business.amenities, '\n\n\n\n')

        del business.amenities

        print('\n\n\n\n',business.amenities, '\n\n\n\n')

        if form.freeWifi.data is True:
            business.amenities.append(free_wifi)

        if form.takeOut.data is True:
            business.amenities.append(take_out)

        if form.dineIn.data is True:
            business.amenities.append(dine_in)

        if form.delivery.data is True:
            business.amenities.append(Delivery)
        
        if form.reservations.data is True:
            business.amenities.append(Reservations)

        if form.vegetarianFriendly.data is True:
            business.amenities.append(Vegetarian_friendly)

        if form.acceptsCreditCards.data is True:
            business.amenities.append(Accepts_Credit_Cards)

        if form.acceptsApplePay.data is True:
            business.amenities.append(Accepts_Apple_Pay)

        if form.acceptsAndroidPay.data is True:
            business.amenities.append(Accepts_Android_Pay)

        if form.publicRestrooms.data is True:
            business.amenities.append(Public_Restrooms)

        if form.kidFriendly.data is True:
            business.amenities.append(Kid_friendly)

        if form.outdoorSeating.data is True:
            business.amenities.append(Outdoor_seating)

        if form.largeGroupFriendly.data is True:
            business.amenities.append(Large_group_friendly)

        if form.offersCatering.data is True:
            business.amenities.append(Offers_Catering)

        if form.wheelchairAccessible.data is True:
            business.amenities.append(Wheelchair_accessible)

        if form.dogsAllowed.data is True:
            business.amenities.append(Dogs_allowed)

        if form.liveMusic.data is True:
            business.amenities.append(Live_music)

        print('\n\n\n\n',business.amenities, '\n\n\n\n')
        db.session.commit()
        return business.to_dict_no_category()

    return 'Failure to add amenities to business'


@business_routes.route('<int:id>/categories', methods=['POST'])
@login_required
def add_categories_to_business(id):
    business = Business.query.get(id)
    if not business:
        return {"message": "Business could not be found", "statusCode": 404}

    if business.owner_id != current_user.id:
        return {"message": "Forbidden", "statusCode": 403}

    data = request.get_json()
    # print(data)
    print('\n\n\n\n', (data), '\n\n\n\n')
    key_data_lst = data.keys()
    value_data_lst = data.values()
    # print('\n\n\n\n', zip(key_data_lst, value_data_lst), '\n\n\n\n')
    zipped_lst = list(zip(key_data_lst, value_data_lst))
    print('\n\n\n\n', (zipped_lst), '\n\n\n\n')
    # print(zipped_lst)

    categories = Category.query.all()
    # print(categories)

    categories_lst = []
    for category in categories:
        # print(category.category)
        categories_lst.append(category.category)

    # business.clear_categories()
    print('\n\n\n\n', business.categories, '\n\n\n\n')
    del business.categories
    print('\n\n\n\n', business.categories, '\n\n\n\n')

    # for data_tuple in zipped_lst:
    #     # print('\n\n\n\n', (data_tuple), '\n\n\n\n')
    #     if data_tuple[1] is True:

    #         business.categories.append(Category(category = data_tuple[0]))

    i = 0
    while i < len(zipped_lst):
        print(categories_lst.index(zipped_lst[i][0]) + 1, 'INDEX')
        if zipped_lst[i][1] is True:
            business.categories.append(Category.query.get(categories_lst.index(zipped_lst[i][0]) + 1))
        i += 1
    # db.session.add(business)
    db.session.commit()
    return business.to_dict_no_category()
    




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
