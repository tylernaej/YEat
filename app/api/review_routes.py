from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import User, Business, Category, Amenity, Image, Review, db
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages




@review_routes.route('/<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(reviewId):

    # query for the review
    review = Review.query.get(reviewId)

    # if no review found
    if not review:
        return {"message": "Review could not be found", "statusCode": 404}, 404

    # if user is not the reviewer
    if current_user.id != review.user_id:
        return {"message": "Forbidden", "statusCode": 403}, 403

    # update the information
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n\n\n\n', form.errors, '\n\n\n\n')
    if form.validate_on_submit():
        print('\n\n\n\n', 'TEST', '\n\n\n\n')
        review.rating = form.rating.data
        review.review = form.review.data

        db.session.add(review)
        db.session.commit()
        # return the updated review
        return review.to_dict()

    # return errors if
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):

    # query for the review
    review = Review.query.get(reviewId)

    # if no review found
    if not review:
        return {"message": "Review could not be found", "statusCode": 404}, 404

    # if user is not the reviewer
    # print('\n\n\n', current_user.id, review, '\n\n\n')
    if current_user.id != review.user_id:
        return {"message": "Forbidden", "statusCode": 403}, 403

    # delete the review
    db.session.delete(review)
    db.session.commit()

    return { "message": "Successfully deleted", "statusCode": 200 }, 200

    # return success message

@review_routes.route('/<int:reviewId>/images', methods=["POST"])
@login_required
def add_image_to_review(reviewId):
    pass
    # query for the review

    # add images

    # return the image



@review_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_review_by_id(id):
    review = Review.query.get(id)

    return review.to_dict()
