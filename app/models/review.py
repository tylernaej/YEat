from .db import db
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(2000), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    images = db.relationship("Image", back_populates='review', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<{self.id}: user {self.user_id} rates business {self.business_id} with rating of {self.rating}>'

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
            "rating": self.rating,
            "review": self.review,
            # 'images': [image.to_dict() for image in self.images],
            "timeCreated": self.time_created,
            "timeUpdated": self.time_updated
        }
