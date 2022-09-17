from app.models import db, Business, Amenity, Category
# from .amenities import free_wifi, take_out, dine_in, delivery, reservations, vegetarian_friendly, accepts_credit_cards, accepts_apple_pay, accepts_android_pay, public_restrooms, kid_friendly, outdoor_seating, large_group_friendly, offers_catering, wheelchair_accessible




def seed_businesses():
    business_1 = Business(
        owner_id = 1,
        name = "Running Goose",
        email = "business1@seeder.com",
        phone = "(323) 469-1080",
        website = "https://runningoose.com",
        address = "1620 N Cahuenga Blvd",
        city = "Los Angeles",
        state = "CA",
        zipcode = 90028,
        country = "USA",
        latitude = 34.1012,
        longitude = 118.3257,
        description = "Inspired by the widely undiscovered specialties of Central America and the Yucatan, the Goose is a celebration of southern California's hidden pockets of cultural influence. Serving takes on seafood, tropical foods, and types of cuisine not known to most Angelenos, the Running Goose creates an ambience with its tostadas, churros, herb garden and outdoor patio, combined with family-style tapas items designed to be shared, that makes guests wonder if they are in a busy Hollywood corridor or a night market in El Salvador. Each of Los Angeles's cultural subdivisions - Koreatown, Little Tokyo, Little Ethiopica, and the like, reflect the best cuisine of their primary population group. The Running Goose creates a cultural pocket that reflects the best of Central American Cuisine, from within the comfort of a chic, postmodern, socially intimate dining experience. With a menu of items designed to be ordered for the whole table, the Running Goose is meant to be enjoyed like a backyard family picnic.",
        price_range = 2
    )

    free_wifi = Amenity.query.get(1)
    take_out = Amenity.query.get(2)
    dine_in = Amenity.query.get(3)
    chinese = Category.query.get(1)
    japanese = Category.query.get(2)


    business_1.amenities.append(free_wifi)
    business_1.amenities.append(take_out)
    business_1.amenities.append(dine_in)
    business_1.categories.append(chinese)

    
    business_2 = Business(
        owner_id = 1,
        name = "Granville",
        email = "business2@seeder.com",
        phone = "(424) 522-5161",
        website = "https://www.granvillerestaurants.com/",
        address = "8701 Beverly Blvd",
        city = "West Hollywood",
        state = "CA",
        zipcode = 90048,
        country = "USA",
        latitude = 34.0522,
        longitude = 118.2437,
        description = "LA's Favorite Neighborhood Spot Since 2006. Come As You Are!",
        price_range = 2
    )

    business_2.amenities.append(free_wifi)
    business_2.amenities.append(take_out)
    business_2.amenities.append(dine_in)
    business_2.categories.append(japanese)

    db.session.add(business_1)
    db.session.add(business_2)
    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
