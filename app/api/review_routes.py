from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload

review_routes = Blueprint('reviews', __name__)


