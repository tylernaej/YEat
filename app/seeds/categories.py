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
	"Bars",
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
	"Juice Bars & Smoothies",
	"Vietnamese",
	"Mexican",
	"Middle Eastern",
	"Barbeque",
	"Greek",
	"Cafes",
	"Vegan",
	"Ice Cream & Frozen Yogurt",
	"Korean",
	"Soup",
	"Vegetarian",
	"Bakeries",
	"Pakistani",
	"Beer, Wine & Spirits",
	"Gluten-Free",
	"Bagels",
	"Food Trucks",
	"Sushi Bars",
	"Bubble Tea",
	"Ramen",
	"Sports Bars",
	"Turkish",
	"Falafel",
	"Hot Pot",
	"Wraps",
	"Tacos",
	"Acai Bowls",
	"Hot Dogs",
	"Poke",
	"Filipino"
]

def seed_categories():
    categories = [Category(category = category) for category in category_list]

    for category in categories:
        db.session.add(category)

    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
