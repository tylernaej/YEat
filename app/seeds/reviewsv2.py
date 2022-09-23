from app.models import db, Review, Business
from random import randint

def seed_reviewsv2():
    reviews = {
        1: f'Gross! This place is very dumpy and in a serious need of a fresh paint job. I asked for my steak medium-rare, but it was still cold. I wish I could put a sign out front that said "DON\'T EAT HERE!"',
        2: f'This place is a waste of calories. The steak was a little dry. The waiter was mediocre at best. There were a lot of interesting decorations on the walls. The menu didn\'t match the one on their website. 2 stars.',
        3: f'I had high hopes for this place. The entree I had was sublime. Some of my favorite dishes are no longer available. The ambiance gives off an earthy feel-good vibe. The waitress was nothing remarkable. Overall experience: 3 stars.',
        4: f'I was pleasantly surprised. The food is simply to die for. Make sure to save room for dessert, because that was the best part of the meal! Everything I tried was bursting with flavor. I had a satisfactory experience and will have to try it again.',
        5: f'I\'ve got a fetish for good food and this place gets me hot! I was happy to see how clean everything was. The food was cooked to perfection. Make sure to save room for dessert, because that was the best part of the meal! The decor was unique and incredible. I\'m definitely coming back for more!',
        6: f'Yuck! I think this place was featured on Kitchen Nightmares, or at least it should have been. This place is very dumpy and in a serious need of a makeover. Everything tasted either microwaved or straight from a can. I found an eyelash that definitely wasn\'t mine in my food. I wish I could put a sign out front that said "RUN AWAY!"',
        7: f'This place was just ok. The food was all right but seriously lacked presentation. I shouldn\'t have to pay good money to be served vegetables from a can. The service wasn\'t that good and the waiter was rude. The menu didn\'t match the one on their website. I had a less than satisfactory experience and will probably not be here again.',
        8: f'I had high hopes for this place. The entree I had was sublime. Some of my favorite dishes are no longer available. The ambiance gives off an earthy feel-good vibe. The waitress was nothing remarkable. Overall experience: 3 stars.',
        9: f'I was pleasantly surprised. The food is simply to die for. Make sure to save room for dessert, because that was the best part of the meal! Everything I tried was bursting with flavor. I had a satisfactory experience and will have to try it again.',
        10: f'Yummers! Everything was simply decadent. Everything I tried was bursting with flavor. I\'m definitely coming back for more!', }

    for b_id in range(1, 31):

        business = Business.query.get(b_id)

        users = set()

        for r_count in range(1, randint(10, 20)):

            r_u_id = randint(1, 24)

            if business.owner_id == r_u_id:
                continue

            if r_u_id not in users:

                randRating = randint(1, 10)

                review = Review(
                    user_id = r_u_id,
                    business_id = b_id,
                    rating = randRating if randRating < 6 else randRating - 5,
                    review = reviews[randRating],
                )
                db.session.add(review)

    db.session.commit()

def undo_reviewsv2():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
