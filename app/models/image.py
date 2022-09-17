from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.String, nullable=False)
    uploader_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))

    business = db.relationship('Business', back_populates='images')
    review = db.relationship('Review', back_populates='images')

    
    def __repr__(self):
        return f'<This is image number {self.id}>'

    
    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "uploaderId": self.uploader_id,
            "businessId": self.business_id,
            "reviewId": self.review_id
        }
