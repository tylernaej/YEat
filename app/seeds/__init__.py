from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .categories import seed_categories, undo_businesses
from .amenities import seed_amenities, undo_amenities
from .reviews import seed_reviews, undo_reviews
from .images import seed_images, undo_images

from .reviewsv2 import seed_reviewsv2, undo_reviewsv2
from .users_may import seed_usersv2, undo_usersv2

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_amenities()
    seed_categories()
    # seed_users()
    seed_usersv2()
    seed_businesses()
    # seed_reviews()
    seed_reviewsv2()
    # seed_images()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_users()
    undo_usersv2()
    # Add other undo functions here
    undo_businesses()
    undo_amenities()
    # undo_reviews()
    undo_reviewsv2()
    # undo_images()
