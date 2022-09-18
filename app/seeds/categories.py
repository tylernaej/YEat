from app.models import db, Category

category_list = [
    "Chinese",
    "Japanese",
    "Italian",
    "Pizza",
    "Burgers",
    "Thai",
	"Sandwiches",
	"Salad",
	"Chicken Wings",
	"Indian",
	"Nightlife",
	"Bar",
	"Asian Fusion",
	"Mediterranean",
	"Breakfast & Brunch",
	"Seafood",
	"Noodles",
	"Fast Food",
	"Coffee & Tea",
	"Halal",
	"Dim Sum",
	"Deli",
	"American",
	"Dessert",
	"Juices & Smoothies",
	"Vietnamese",
	"Mexican",
	"Middle Eastern",
	"Barbeque",
	"Greek",
	"Cafe",
	"Vegan",
	"Ice Cream",
	"Korean",
	"Soup",
	"Vegetarian",
	"Bakeries",
	"Pakistani",
	"Beer, Wine & Spirits",
	"Gluten-Free",
	"Bagels",
	"Food Truck",
	"Sushi Bar",
	"Boba Tea",
	"Ramen",
	"Sports Bar",
	"Turkish",
	"Falafel",
	"Hot Pot",
	"Wraps",
	"Tacos",
	"Acai Bowls",
	"Hot Dogs",
	"Poke",
	"Filipino",
    "Frozen Yogurt"
]

def seed_categories():
    categories = [Category(category = category) for category in category_list]

    for category in categories:
        db.session.add(category)

    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
