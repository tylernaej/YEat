from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError

class AddAmenityForm(FlaskForm):
      freeWifi = BooleanField("Free-wifi")
      takeOut = BooleanField("Take-out")
      dineIn = BooleanField("Dine-in")
      delivery = BooleanField("Delivery")
      reservations = BooleanField("Reservations")
      vegetarianFriendly = BooleanField("Vegetarian-friendly")
      acceptsCreditCards = BooleanField("Accepts Credit Cards")
      acceptsApplePay = BooleanField("Accepts Apple Pay")
      acceptsAndroidPay = BooleanField("Accepts Android Pay")
      publicRestrooms = BooleanField("Public Restrooms")
      kidFriendly = BooleanField("Kid friendly")
      outdoorSeating = BooleanField("Outdoor seating")
      largeGroupFriendly = BooleanField("Large-group friendly")
      offersCatering = BooleanField("Offers Catering")
      wheelchairAccessible = BooleanField("Wheelchair accessible")
      dogsAllowed = BooleanField("Dogs allowed")
      liveMusic = BooleanField("Live music")