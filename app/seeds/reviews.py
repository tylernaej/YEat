from app.models import business, db, Review

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

    # review_ = Review(
    #     user_id = 4,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = 4,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )
    # review_ = Review(
    #     user_id = ,
    #     business_id = ,
    #     rating = ,
    #     review = ,
    # )

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
