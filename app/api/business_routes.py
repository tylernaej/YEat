from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business, Category
from flask_login import current_user, login_user, logout_user, login_required

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
def get_businesses_of_current_user():
    businesses = Business.query.filter(Business.owner_id == current_user.id).all()

    biz_lst = []

    for business in businesses:
        category = Category.query.get(business.id)
        dict_business= business.to_dict()
        dict_business['category'] = category.category
        biz_lst.append(dict_business)

    return {'businesses': [business for business in biz_lst]}

@business_routes.route('/<business:id>')
def get_business_by_id(id):
    business = Business.query.get(id)
    return business.to_dict()
