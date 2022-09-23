from app.models import db, Amenity

amenities = [
      "Free-wifi",
      "Take-out",
      "Dine-in",
      "Delivery",
      "Reservations",
      "Vegetarian-friendly",
      "Accepts Credit Cards",
      "Accepts Apple Pay",
      "Accepts Android Pay",
      "Public Restrooms",
      "Kid friendly",
      "Outdoor seating",
      "Large-group friendly",
      "Offers Catering",
      "Wheelchair accessible",
      "Dogs allowed",
      "Live music",
      "Garage Parking"
]


def seed_amenities():

    amenities_data = [Amenity(description = amenity) for amenity in amenities]

    for amenity in amenities_data:
        db.session.add(amenity)

    db.session.commit()

def undo_amenities():
    db.session.execute('TRUNCATE amenities RESTART IDENTITY CASCADE;')
    db.session.commit()
