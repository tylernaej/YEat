from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password', profile_picture='https://cdn.allthings.how/wp-content/uploads/2020/11/allthings.how-how-to-change-your-picture-on-zoom-profile-picture.png')
    connor = User(
        first_name='Connor', last_name='Lam', username='connor', email='connor@aa.io', password='password', profile_picture='https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc')
    tyler = User(
        first_name='Tyler', last_name='Jean', username='tyler', email='tyler@aa.io', password='password')
    edward = User(
        first_name='Edward', last_name='Felipe', username='edward', email='edward@aa.io', password='password')

    db.session.add(demo)
    db.session.add(connor)
    db.session.add(tyler)
    db.session.add(edward)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
