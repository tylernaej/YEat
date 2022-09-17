from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

amenity_routes = Blueprint('amenities', __name__)

@amenity_routes.route('/')
def get_all_amenities():
    amenities = Amenity.query.all()

    amenities_lst = []
    for amenity in amenities:
        amenities_lst.append(amenity.description)
    
    return {"amenities": amenities_lst}