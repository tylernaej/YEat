from app.models import db, User


# Adds a demo user, you can add other users here if you want.
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password', profile_picture='https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg')

    yasmine = User(
        first_name='Yasmine', last_name='Mccabe', username='yasmine', email='yasmine@aa.io', password='password'
    )
    zane = User(
        first_name='Zane', last_name='Huber', username='zane', email='zane@aa.io', password='password'
    )
    parris = User(
        first_name='Parris', last_name='Spencer', username='parris', email='parris@aa.io', password='password'
    )
    cataleya = User(
        first_name='Cataleya', last_name='Houston', username='cataleya', email='cataleya@aa.io', password='password'
    )
    richie = User(
        first_name='Richie', last_name='Dennis', username='richie', email='richie@aa.io', password='password'
    )
    saara = User(
        first_name='Saara', last_name='Mcloughlin', username='saara', email='saara@aa.io', password='password'
    )
    vikki = User(
        first_name='Vikki', last_name='Bob', username='vikki', email='vikki@aa.io', password='password'
    )
    ezra = User(
        first_name='Ezra', last_name='Stacey', username='ezra', email='ezra@aa.io', password='password'
    )
    meerab = User(
        first_name='Meerab', last_name='Greig', username='meerab', email='meerab@aa.io', password='password'
    )
    nathaniel = User(
        first_name='Nathaniel', last_name='Neale', username='nathaniel', email='nathaniel@aa.io', password='password'
    )
    benas = User(
        first_name='Benas', last_name='Jensen', username='benas', email='benas@aa.io', password='password'
    )
    vicky = User(
        first_name='Vicky', last_name="O'Quinn", username='vicky', email='vicky@aa.io', password='password'
    )
    cheyanne = User(
        first_name='Cheyanne', last_name='Talley', username='cheyanne', email='cheyanne@aa.io', password='password'
    )
    tara = User(
        first_name='Tara', last_name='Whitaker', username='tara', email='tara@aa.io', password='password'
    )
    frank = User(
        first_name='Frank', last_name='Lamb', username='frank', email='frank@aa.io', password='password'
    )
    aras = User(
        first_name='Aras', last_name='Cash', username='aras', email='aras@aa.io', password='password'
    )

    db.session.add(demo)
    db.session.add(yasmine)
    db.session.add(zane)
    db.session.add(parris)
    db.session.add(cataleya)
    db.session.add(richie)
    db.session.add(saara)
    db.session.add(vikki)
    db.session.add(ezra)
    db.session.add(meerab)
    db.session.add(nathaniel)
    db.session.add(benas)
    db.session.add(vicky)
    db.session.add(cheyanne)
    db.session.add(tara)
    db.session.add(frank)
    db.session.add(aras)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
