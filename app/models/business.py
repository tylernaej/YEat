from .db import db
from .amenity import business_amenities
from .category import business_categories


class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    website = db.Column(db.String(50))
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(50), nullable=False)
    price_range = db.Column(db.Integer, nullable=False)

    owner = db.relationship("User", back_populates='businesses')
    reviews = db.relationship("Review", back_populates='business')
    images = db.relationship("Image", back_populates='business')
    amenities = db.relationship("Amenity", secondary=business_amenities, back_populates='businesses', cascade="all, delete")
    categories = db.relationship("Category", secondary=business_categories, back_populates='businesses', cascade="all, delete")


    def clear_categories(self):
        self.categories = None
        return {
           "categories" : self.categories
        }


    def to_dict(self):

        return {
            "id" : self.id,
            "ownerId" : self.owner_id,
            "name" : self.name,
            "email" : self.email,
            "phone" : self.phone,
            "website" : self.website,
            "address" : self.address,
            "city" : self.city,
            "state" : self.state,
            "zipcode" : self.zipcode,
            "country" : self.country,
            "latitude" : self.latitude,
            "longitude" : self.longitude,
            "description" : self.description,
            "priceRange" : self.price_range,
            "categories": self.categories
        }

    def to_dict_no_category(self):

        return {
            "id" : self.id,
            "ownerId" : self.owner_id,
            "name" : self.name,
            "email" : self.email,
            "phone" : self.phone,
            "website" : self.website,
            "address" : self.address,
            "city" : self.city,
            "state" : self.state,
            "zipcode" : self.zipcode,
            "country" : self.country,
            "latitude" : self.latitude,
            "longitude" : self.longitude,
            "description" : self.description,
            "priceRange" : self.price_range,
        }

    def __repr__(self):
        return f'<{self.id}, {self.name}>'
