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
        latitude = 34.1005,
        longitude = -118.3292,
        description = "Inspired by the widely undiscovered specialties of Central America and the Yucatan, the Goose is a celebration of southern California's hidden pockets of cultural influence. Serving takes on seafood, tropical foods, and types of cuisine not known to most Angelenos, the Running Goose creates an ambience with its tostadas, churros, herb garden and outdoor patio, combined with family-style tapas items designed to be shared, that makes guests wonder if they are in a busy Hollywood corridor or a night market in El Salvador. Each of Los Angeles's cultural subdivisions - Koreatown, Little Tokyo, Little Ethiopica, and the like, reflect the best cuisine of their primary population group. The Running Goose creates a cultural pocket that reflects the best of Central American Cuisine, from within the comfort of a chic, postmodern, socially intimate dining experience. With a menu of items designed to be ordered for the whole table, the Running Goose is meant to be enjoyed like a backyard family picnic.",
        price_range = 2
    )
    #Amenities 
    free_wifi = Amenity.query.get(1)
    take_out = Amenity.query.get(2)
    dine_in = Amenity.query.get(3)
    Delivery = Amenity.query.get(4)
    Reservations = Amenity.query.get(5)
    Vegetarian_friendly = Amenity.query.get(6)
    Accepts_Credit_Cards = Amenity.query.get(7)
    Accepts_Apple_Pay = Amenity.query.get(8)
    Accepts_Android_Pay = Amenity.query.get(9)
    Public_Restrooms = Amenity.query.get(10)
    Kid_friendly = Amenity.query.get(11)
    Outdoor_seating = Amenity.query.get(12)
    Large_group_friendly = Amenity.query.get(13)
    Offers_Catering = Amenity.query.get(14)
    Wheelchair_accessible = Amenity.query.get(15)
    Dogs_allowed = Amenity.query.get(16)
    Live_music = Amenity.query.get(17)
    #Categories
    chinese = Category.query.get(1)
    japanese = Category.query.get(2)
    Italian = Category.query.get(3)
    Pizza = Category.query.get(4)
    Burgers = Category.query.get(5)
    Thai = Category.query.get(6)
    Sandwiches = Category.query.get(7)
    Salad = Category.query.get(8)
    Chicken_Wings = Category.query.get(9)
    Indian = Category.query.get(10)
    Nightlife = Category.query.get(11)
    Bar = Category.query.get(12)
    Asian_Fusion = Category.query.get(13)
    Mediterranean = Category.query.get(14)
    Breakfast_Brunch = Category.query.get(15)
    Seafood = Category.query.get(16)
    Noodles = Category.query.get(17)
    Fast_Food = Category.query.get(18)
    Coffee_Tea = Category.query.get(19)
    Halal = Category.query.get(20)
    Dim_Sum = Category.query.get(21)
    Deli = Category.query.get(22)
    American = Category.query.get(23)
    Dessert = Category.query.get(24)
    Juices_Smoothies = Category.query.get(25)
    Vietnamese = Category.query.get(26)
    Mexican = Category.query.get(27)
    Middle_Eastern = Category.query.get(28)
    Barbeque = Category.query.get(29)
    Greek = Category.query.get(30)
    Cafe = Category.query.get(31)
    Vegan = Category.query.get(32)
    Ice_Cream = Category.query.get(33)
    Korean = Category.query.get(34)
    Soup = Category.query.get(35)
    Vegetarian = Category.query.get(36)
    Bakery = Category.query.get(37)
    Pakistani = Category.query.get(38)
    Beer_Wine_Spirits = Category.query.get(39)
    Gluten_Free = Category.query.get(40)
    Bagels = Category.query.get(41)
    Food_Truck = Category.query.get(42)
    Sushi_Bar = Category.query.get(43)
    Boba_Tea = Category.query.get(44)
    Ramen = Category.query.get(45)
    Sports_Bar = Category.query.get(46)
    Turkish = Category.query.get(47)
    Falafel = Category.query.get(48)
    Hot_Pot = Category.query.get(49)
    Wraps = Category.query.get(50)
    Tacos = Category.query.get(51)
    Acai_Bowls = Category.query.get(52)
    Hot_Dogs = Category.query.get(53) 
    Poke = Category.query.get(54)
    Filipino = Category.query.get(55)
    Frozen_Yogurt = Category.query.get(56)
    #biz1
    business_1.amenities.append(free_wifi)
    business_1.amenities.append(take_out)
    business_1.amenities.append(dine_in)
    # business_1.amenities.append(Vegetarian_friendly)
    # business_1.amenities.append(Accepts_Credit_Cards)
    # business_1.amenities.append(Accepts_Apple_Pay)
    # business_1.amenities.append(Accepts_Android_Pay)
    # business_1.amenities.append(Public_Restrooms)
    # business_1.amenities.append(Wheelchair_accessible)
    # business_1.amenities.append(Dogs_allowed)
    # business_1.amenities.append(Outdoor_seating)
    # business_1.amenities.append(Reservations)

    business_1.categories.append(American)
    business_1.categories.append(Beer_Wine_Spirits)
    business_1.categories.append(Italian)
    #biz2  
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
        latitude = 34.0771,
        longitude = -118.3806,
        description = "LA's Favorite Neighborhood Spot Since 2006. Come As You Are!",
        price_range = 2
    )

    business_2.amenities.append(free_wifi)
    business_2.amenities.append(take_out)
    business_2.amenities.append(dine_in)
    business_2.amenities.append(Vegetarian_friendly)
    business_2.amenities.append(Accepts_Credit_Cards)
    business_2.amenities.append(Accepts_Apple_Pay)
    business_2.amenities.append(Accepts_Android_Pay)
    business_2.amenities.append(Public_Restrooms)
    business_2.amenities.append(Wheelchair_accessible)

    business_2.categories.append(American)
    business_2.categories.append(Beer_Wine_Spirits)
    business_2.categories.append(Salad)
    business_2.categories.append(Sandwiches)
    business_2.categories.append(Cafe)
    business_2.categories.append(Bar)
    #biz3
    business_3 = Business(
        owner_id = 1,
        name = "Egg Tuck",
        email = "business3@seeder.com",
        phone = "(213) 674-7080",
        website = "http://www.eggtuck.com",
        address = "3458 Wilshire Blvd Ste 1/2",
        city = "Los Angeles",
        state = "CA",
        zipcode = 90010,
        country = "USA",
        latitude = 34.0617,
        longitude = -118.2995,
        description = "Urban Egg Sandwich & Coffee, Koreatown Los Angels. Taste the hottest new trending egg sandwich concept from Korea on a premium brioche bun all made in house fresh every day. Proudly serving groundworkcoffee and Drinks.",
        price_range = 1
    )

    business_3.amenities.append(free_wifi)
    business_3.amenities.append(take_out)
    business_3.amenities.append(dine_in)
    business_3.amenities.append(Accepts_Credit_Cards)
    business_3.amenities.append(Accepts_Apple_Pay)
    business_3.amenities.append(Accepts_Android_Pay)
    business_3.amenities.append(Wheelchair_accessible)

    business_3.categories.append(Breakfast_Brunch)
    business_3.categories.append(Coffee_Tea)
    business_3.categories.append(Bagels)
    business_3.categories.append(Sandwiches)
    business_3.categories.append(Cafe)
    business_3.categories.append(Burgers)

    #biz4
    business_4 = Business(
        owner_id = 1,
        name = "Howlin' Ray's",
        email = "business4@seeder.com",
        phone = "(213) 935-8399",
        website = "http://www.howlinrays.com",
        address = "727 N Broadway Ste 128",
        city = "Los Angeles",
        state = "CA",
        zipcode = 90012,
        country = "USA",
        latitude = 34.0613,
        longitude = -118.2393,
        description = "Nashville Hot Chicken.",
        price_range = 2
    )    

    business_4.amenities.append(take_out)
    business_4.amenities.append(Accepts_Credit_Cards)
    business_4.amenities.append(Accepts_Apple_Pay)
    business_4.amenities.append(Accepts_Android_Pay)
    business_4.amenities.append(Wheelchair_accessible)
    business_4.amenities.append(Kid_friendly)
    business_4.amenities.append(Offers_Catering)

    business_4.categories.append(Sandwiches)
    business_4.categories.append(Chicken_Wings)
    business_4.categories.append(Fast_Food)
    business_4.categories.append(Barbeque)

    #biz5
    business_5 = Business(
        owner_id = 1,
        name = "Bottega Louie",
        email = "business5@seeder.com",
        phone = "(213) 802-1470",
        website = "http://www.bottegalouie.com/",
        address = "700 S Grand Ave",
        city = "Los Angeles",
        state = "CA",
        zipcode = 90017,
        country = "USA",
        latitude = 34.0470,
        longitude = -118.2565,
        description = "Bottega Louie Restaurant, Gourmet Market & Patisserie serves fine food daily. Please accept our apologies, but we do not accept reservations.",
        price_range = 2
    ) 


    business_5.amenities.append(dine_in)
    business_5.amenities.append(take_out)
    business_5.amenities.append(Accepts_Credit_Cards)
    business_5.amenities.append(Accepts_Apple_Pay)
    business_5.amenities.append(Accepts_Android_Pay)
    business_5.amenities.append(Wheelchair_accessible)
    business_5.amenities.append(Kid_friendly)
    business_5.amenities.append(Offers_Catering)
    business_5.amenities.append(free_wifi)
    business_5.amenities.append(Public_Restrooms)
    business_5.amenities.append(Vegetarian_friendly)

    business_5.categories.append(Italian)
    business_5.categories.append(Dessert)
    business_5.categories.append(Breakfast_Brunch)
    business_5.categories.append(Bakery)
    
    #biz6
    business_6 = Business(
        owner_id = 1,
        name = "Slurpin' Ramen Bar",
        email = "business6@seeder.com",
        phone = "(213) 603-9492",
        website = "https://slurpinramenbar.com",
        address = "3500 W 8th St",
        city = "Los Angeles",
        state = "CA",
        zipcode = 90005,
        country = "USA",
        latitude = 34.0574,
        longitude = -118.3067,
        description = "Slurpin' Ramen Bar is famous for their rich, thick and creamy tonkotsu broth ramens. We add home made ramen noodles with a huge assortment of different toppings to create an unforgettable dish! We also have vegetarian ramen noodles and broth for our health conscious customers. If you are ever craving ramen, Slurpin is the best place to be.",
        price_range = 2
    ) 

    business_6.amenities.append(dine_in)
    business_6.amenities.append(take_out)
    business_6.amenities.append(Accepts_Credit_Cards)
    business_6.amenities.append(Wheelchair_accessible)
    business_6.amenities.append(Kid_friendly)
    business_6.amenities.append(free_wifi)
    business_6.amenities.append(Public_Restrooms)
    business_6.amenities.append(Vegetarian_friendly)
    business_6.amenities.append(Large_group_friendly)

    business_6.categories.append(Ramen)
    business_6.categories.append(Noodles)
    business_6.categories.append(japanese)
    business_6.categories.append(Boba_Tea)

    #biz7
    business_7 = Business(
        owner_id = 1,
        name = "Tempura Endo",
        email = "business7@seeder.com",
        phone = "(424) 512-4518",
        website = "http://www.beverlyhills-endo.com/",
        address = "9777 S Santa Monica Blvd",
        city = "Beverly Hills",
        state = "CA",
        zipcode = 90210,
        country = "USA",
        latitude = 34.0675,
        longitude = -118.4090,
        description = "Premium Kyoto-style tempura and sushi restaurant featuring Omakase menu, a high-end, intimate dining experience, and a unique atmosphere only available in Beverly Hills and Japan. Fine dining with a premium selection of sakes in Beverly Hills, perfect for romantic date nights, intimate dining experiences, and experiencing one-of-a-kind exclusive items.",
        price_range = 4
    ) 

    business_7.amenities.append(dine_in)
    business_7.amenities.append(take_out)
    business_7.amenities.append(Accepts_Credit_Cards)
    business_7.amenities.append(Wheelchair_accessible)
    business_7.amenities.append(Public_Restrooms)
    business_7.amenities.append(Vegetarian_friendly)
    business_7.amenities.append(Large_group_friendly)

    business_7.categories.append(japanese)
    business_7.categories.append(Seafood)


    db.session.add(business_1)
    db.session.add(business_2)
    db.session.add(business_3)
    db.session.add(business_4)
    db.session.add(business_5)
    db.session.add(business_6)
    db.session.add(business_7)
    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
