from app.models import db, Category

category_list = [
    "Chinese",
    "Japanese",
    "Italian",
    "Pizza",
    "Burgers",
    "Thai"
]

def seed_categories():
    categories = [Category(category = category) for category in category_list]

    for category in categories:
        db.session.add(category)

    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
