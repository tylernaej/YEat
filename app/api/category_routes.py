from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def get_all_categories():
    categories = Category.query.all()

    categories_lst = []
    for category in categories:
        categories_lst.append(category.category)
    
    return {"categories": categories_lst}