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
    # free_wifi = Amenity(description = "Free-wifi")
    # take_out = Amenity(description = "Take-out")
    # dine_in = Amenity(description = "Dine-in")
    # delivery = Amenity(description = "Delivery")
    # reservations = Amenity(description = "Reservations")
    # vegetarian_friendly = Amenity(description = "Vegetarian-friendly")
    # accepts_credit_cards = Amenity(description = "Accepts Credit Cards")
    # accepts_apple_pay = Amenity(description = "Accepts Apple Pay")
    # accepts_android_pay = Amenity(description = "Accepts Android Pay")
    # public_restrooms = Amenity(description = "Public Restrooms")
    # kid_friendly = Amenity(description = "Kid friendly")
    # outdoor_seating = Amenity(description = "Outdoor seating")
    # large_group_friendly = Amenity(description = "Large-group friendly")
    # offers_catering  = Amenity(description = "Offers Catering")
    # wheelchair_accessible = Amenity(description = "Wheelchair accessible")
    # dogs_allowed = Amenity(description = "Dogs Allowed")

    # db.session.add(free_wifi)
    # db.session.add(take_out)
    # db.session.add(dine_in)
    # db.session.add(delivery)
    # db.session.add(reservations)
    # db.session.add(vegetarian_friendly)
    # db.session.add(accepts_credit_cards)
    # db.session.add(accepts_apple_pay)
    # db.session.add(accepts_android_pay)
    # db.session.add(public_restrooms)
    # db.session.add(kid_friendly)
    # db.session.add(outdoor_seating)
    # db.session.add(large_group_friendly)
    # db.session.add(offers_catering)
    # db.session.add(wheelchair_accessible)
    # db.session.add(dogs_allowed)
    # db.session.commit()


    amenities_data = [Amenity(description = amenity) for amenity in amenities]

    for amenity in amenities_data:
        db.session.add(amenity)

    db.session.commit()

def undo_amenities():
    db.session.execute('TRUNCATE amenities RESTART IDENTITY CASCADE;')
    db.session.commit()
