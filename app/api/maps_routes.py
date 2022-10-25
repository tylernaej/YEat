from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user

from app.config import Config

map_routes = Blueprint('maps', __name__)

@map_routes.route('/key', methods=['POST'])
def get_google_api():
    api_key = Config.googleMapsAPIKey
    return { 'googleMapsAPIKey': api_key}