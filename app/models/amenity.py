from .db import db
# from sqlalchemy import MetaData


business_amenities = db.Table(
    "business_amenities",
    db.Model.metadata,
    db.Column("business_id", db.Integer, db.ForeignKey('businesses.id'), primary_key=True),
    db.Column("amenity_id", db.Integer, db.ForeignKey('amenities.id'), primary_key=True)
)


class Amenity(db.Model):
    __tablename__ = 'amenities'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(50), nullable=False)

    businesses = db.relationship("Business", secondary=business_amenities, back_populates='amenities', cascade="all, delete")


    def __repr__(self):
        return f'<{self.description}>'


    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description
        }
