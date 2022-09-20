from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Business

# validations
def description_length(form, field):
    description = field.data
    if len(description) > 2000:
        raise ValidationError('Description must be 2000 characters or less')
    elif len(description) < 10:
        raise ValidationError('Description must be 10 characters or more')


def valid_lat(form, field):
    latitude = field.data
    if latitude > 90 or latitude < -90:
        raise ValidationError('Invalid Latitude, please be between 90 and -90')


def valid_lng(form, field):
    longitude = field.data
    if longitude > 180 or longitude < -180:
        raise ValidationError('Invalid longitude, please be between 180 and -180')


# def valid_email(form, field):





# form 
class CreateBusinessForm(FlaskForm):
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    zipcode = StringField('Zip Code', validators=[DataRequired()])
    latitude = IntegerField('Latitude', validators=[DataRequired(), valid_lat])
    longitude = IntegerField("Longitude", validators=[DataRequired(), valid_lng])
    description = StringField('Description', validators=[DataRequired(), description_length])
    priceRange = IntegerField('Price Range', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    phone = StringField('Phone Number', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    website = StringField('Website URL')