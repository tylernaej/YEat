from app.models import db, Review, Business
from random import randint

def seed_reviewsv2():
    reviews = {
        1: [
            f'No, no, no, a million times no! This place is very dumpy and in a serious need of a makeover. There were bits of food stuck to my silverware. I wish I could put a sign out front that said "DON\'T EAT HERE!"',
            f'Lame. The service was terrible. The waiter was very air-headed. My shoes were stained with rat droppings after leaving this place. I gave 1 star because I couldn\'t give 0.',
            f'Gross! Eating here is like playing Russian Roulette, only you have a 5 out of 6 chance of getting food poisoning. This place is very dumpy and in a serious need of a makeover. Wild horses couldn\'t drag me back here.',
            f'No! I asked for my steak medium, but it was burnt to a crisp. Too many things on the menu look like crap, smell like crap, and taste like crap. My water glass was stained with lipstick and had bits of food floating in it. I heard a rumor that the vegetarian dishes are prepared alongside the meat. Wild horses couldn\'t drag me back here.',
            f'I can summarize my visit in one word: Lousy. The kitchen screwed up my order completely, mixing it up with someone else\'s. It took almost an hour to get it corrected! Too many things on the menu look like crap, smell like crap, and taste like crap. I wouldn\'t come back here on a dare.',
        ],
        2: [
            f'I had high hopes for this place. The tofu dish tasted spongy and a bit bland. The ambiance gives off an earthy feel-good vibe. Overall experience: 2 stars.',
            f'When I walked in, I really wasn\'t expecting much. The food was all right but seriously lacked presentation. The waiter was mediocre at best. I shouldn\'t have to pay good money to be served vegetables from a can. 2 stars.',
            f'This place is a waste of real estate. I heard a rumor that the vegetarian dishes are prepared alongside the meat. I asked for my steak medium-well, but it was frozen in the center. The service wasn\'t that good and the waiter was rude. 2 stars.',
            f'Bleh. The steak was a little dry. Seriously, how difficult is it to get a clean glass around here? I gave this place two stars because I was feeling extra generous.',
            f'Lame. The waiter was mediocre at best. I found the entrees to not be very agreeable to my personal flavor-profile. They need to get their act together before I set foot in this place again.',
        ],
        3: [
            f'I have been here several times before. The photos of the food were appetizing and palpable, but didn\'t live up to the hype. The menu didn\'t match the one on their website. The ambiance gives off an earthy feel-good vibe. 3 stars.',
            f'I don\'t understand the hype about this place. There were a lot of interesting decorations on the walls. The steak was a little dry. This place deserves its very average rating.',
            f'This place was nearby and I decided to check it out. The waiter was nothing remarkable. The tofu dish tasted spongy and a bit bland. I felt the prices were too high given the quality of the food. The ambiance gives off an earthy feel-good vibe. 3 stars.',
            f'Decent place. The fish was undercooked. The ambiance gives off an earthy feel-good vibe. The menu didn\'t match the one on their website. The service wasn\'t that good and the waitress was unprofessional. 3 stars.',
            f'This place was just ok. The chicken was a little dry. The service was good for the most part but the waitress was a bit air-headed. Overall experience: 3 stars.',
        ],
        4: [
            f'This place was nearby and I decided to check it out. The service was good for the most part but the waiter was a bit tired. The decor was unique and incredible. Everything was mostly decadent. 4 stars.',
            f'This place had a lot of heart. The waiter did an excellent job. I want to hire their decorator to furnish my house. The food is simply to die for. The appetizers must be sprinkled with crack because I just craved for more and more. Solid 4 stars.',
            f'I was pleasantly surprised. The decor was unique and incredible. The entree I had was sublime. 4 stars.',
            f'I was pleasantly surprised. Everything was just so yummy. The decor was unique and incredible. After my meal, I was knocked into a food coma. I could see myself being a regular here.',
            f'I stumbled on this undiscovered gem right in our neighboorhood. The desserts must be sprinkled with crack because I just craved for more and more. I found the entrees to be very agreeable to my personal flavor-profile. Solid 4 stars.',
            f'It was much better than I expected. The food was cooked to perfection. I want to hire their decorator to furnish my house. I removed a star because the wait to get in was so long.',
        ],
        5: [
            f'This is one of my favorite places. The decor was unique and incredible. Try out the huge selection of incredible appetizers. The waitress was prompt and polite. This was one of the best mouth-watering burgers I\'ve had grace my taste buds in a long time. I would eat here every day if I could afford it!',
            f'I stumbled on this undiscovered gem right in our neighboorhood. Make sure to save room for dessert, because that was the best part of the meal! Everything was just so yummy. Overall experience: 5 stars.',
            f'My taste buds are still tingling from our last visit! Make sure to save room for dessert, because that was the best part of the meal! Everything I tried was bursting with flavor. They got a new customer for life!',
            f'Yumm-o! Everything I tried was bursting with flavor. The food was cooked to perfection. I found the ambiance to be very charming. The desserts must be sprinkled with crack because I just craved for more and more. Easily earned their 5 stars!',
            f'This is one of my favorite places. I was happy to see how clean everything was. Everything was simply decadent. The waiter did an excellent job. The appetizers must be sprinkled with crack because I just craved for more and more. Easily earned their 5 stars!',
            f'Yummers! The food was cooked to perfection. Everything I tried was bursting with flavor. I would eat here every day if I could afford it!',
        ]
    }

    for b_id in range(1, 31):

        business = Business.query.get(b_id)

        users = set()

        for r_count in range(1, randint(10, 20)):

            r_u_id = randint(1, 24)

            if business.owner_id == r_u_id:
                continue

            if r_u_id not in users:
                users.add(r_u_id)

                randRating = None

                if r_count % 3 == 0:
                    randRating = randint(1, 3)
                elif r_count % 3 != 0:
                    randRating = randint(3, 5)

                review = Review(
                    user_id = r_u_id,
                    business_id = b_id,
                    rating = randRating,
                    review = reviews[randRating][randint(0, 4)],
                )
                db.session.add(review)

    db.session.commit()

def undo_reviewsv2():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
