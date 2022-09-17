from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    images = db.relationship("Image", back_populates='review')

    def __repr__(self):
        return f'<{self.id}: user {self.user_id} rates business {self.business_id} with rating of {self.rating}>'

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "businessId": self.business_id,
            "rating": self.rating,
            "review": self.review
        }
