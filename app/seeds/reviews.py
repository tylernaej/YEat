from app.models import db, Review

def seed_reviews():
    review_1 = Review(
        user_id = 2,
        business_id = 1,
        rating = 5,
        review = " This place is awesome!"
    )

    review_2 = Review(
        user_id = 3,
        business_id = 1,
        rating = 1,
        review = " This place is trash!!"
    )

    review_3 = Review(
        user_id = 2,
        business_id = 2,
        rating = 5,
        review = " This place is awesome!"
    )

    review_4 = Review(
        user_id = 3,
        business_id = 2,
        rating = 1,
        review = " This place is trash!!"
    )

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
