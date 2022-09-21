from ast import Num
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange

from app.models import review

#validators
def review_length(form, field):
    review = field.data
    if len(review) < 10 or len(review) > 2000:
        raise ValidationError('Review must be between 10 and 2000 characters')

class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), review_length])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1-5")])
