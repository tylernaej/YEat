from .db import db


business_categories = db.Table(
    "business_categories",
    db.Model.metadata,
    db.Column("business_id", db.Integer, db.ForeignKey('businesses.id'), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    category = db.Column(db.String(50), nullable=False)

    businesses = db.relationship("Business", secondary=business_categories, back_populates='categories', cascade="all, delete")

    def __repr__(self):
        return f"<{self.category}>"

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category
        }