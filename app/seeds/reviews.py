from app.models import business, db, Review

def seed_reviews():
    review_1 = Review(
        user_id = 2,
        business_id = 1,
        rating = 5,
        review = "This place is awesome!"
    )

    review_2 = Review(
        user_id = 3,
        business_id = 1,
        rating = 1,
        review = "This place is trash!!"
    )

    review_3 = Review(
        user_id = 2,
        business_id = 2,
        rating = 5,
        review = "This place is awesome!"
    )

    review_4 = Review(
        user_id = 3,
        business_id = 2,
        rating = 1,
        review = "This place is trash!!"
    )

    review_5 = Review(
        user_id = 4,
        business_id = 1,
        rating = 2,
        review = "Bad service, bad food, only thing that made made it not a 1 was the scenery.",
    )
    review_6 = Review(
        user_id = 4,
        business_id = 2,
        rating = 1,
        review = "This place was so bad, nothing good to say about this one.",
    )
    review_7 = Review(
        user_id = 5,
        business_id = 1,
        rating = 4,
        review = "I thoroughly enjoyed the food, I have no complaints.",
    )
    review_8 = Review(
        user_id = 5,
        business_id = 2,
        rating = 3,
        review = "The most average restraunt I have ever been to only thing I could give it was 3 stars",
    )
    review_9 = Review(
        user_id = 6,
        business_id = 1,
        rating = 5,
        review = "I come here every year for my anniversary I love everything about this place, gives me so much nostalgia",
    )
    review_10 = Review(
        user_id = 6,
        business_id = 2,
        rating = 5,
        review = "First time here, the service was great and the food was great, I love it!",
    )
    review_11 = Review(
        user_id = 7,
        business_id = 1,
        rating = 4,
        review = "Love it here. Just today my server Joe was pretty rude other than that everything was great",
    )
    review_12 = Review(
        user_id = 7,
        business_id = 2,
        rating = 3,
        review = "this place is best for comfort food, nothing good nothing bad",
    )
    review_13 = Review(
        user_id = 8,
        business_id = 1,
        rating = 4,
        review = "These goose better run away I love it here",
    )
    review_14 = Review(
        user_id = 8,
        business_id = 2,
        rating = 4,
        review = 'Granville better be named GRANDville it was amazing, could have better restrooms though.',
    )
    review_15 = Review(
        user_id = 9,
        business_id = 2,
        rating = 5,
        review = 'Goose goose goose, goose is the word',
    )
    review_16 = Review(
        user_id = 9,
        business_id = 2,
        rating = 3,
        review = 'This place was a little underwhelming based off what I heard, no complaints though.',
    )
    review_17 = Review(
        user_id = 10,
        business_id = 2,
        rating = 4,
        review = 'If this place had better fries, it would be a 5 star, other than that very good.',
    )
    review_18 = Review(
        user_id = 10,
        business_id = 2,
        rating = 5,
        review = 'Truly an amazing dine in experience, if you come here you must try their Faroe Island sustainable Salmon',
    )

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)
    db.session.add(review_11)
    db.session.add(review_12)
    db.session.add(review_13)
    db.session.add(review_14)
    db.session.add(review_15)
    db.session.add(review_16)
    db.session.add(review_17)
    db.session.add(review_18)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
