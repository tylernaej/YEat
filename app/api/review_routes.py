from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(reviewId):

    # query for the review
    review = Review.query.get(reviewId)

    # if no review found
    if not review:
        #abort ?
        pass

    # if user is not the reviewer
    if current_user != review.user_id:
        #abort ?
        pass

    # update the information
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.rating = form.rating.data
        review.review = form.review.data

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

@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):

    # query for the review
    review = Review.query.get(reviewId)

    # if no review found
    if not review:
        #abort ?
        pass

    # if user is not the reviewer
    if current_user != review.user_id:
        #abort ?
        pass

    # delete the review
    db.session.delete(review)
    db.session.commit()

    return { "message": "Successfully deleted", "statusCode": 200 }

    # return success message

@review_routes.route('/<int:reviewId>/images', methods=["POST"])
@login_required
def add_image_to_review(reviewId):
    pass
    # query for the review

    # add images

    # return the image
