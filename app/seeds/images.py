from app.models import db, Image


def seed_images():
    image_1 = Image(
        url = "https://s3-media0.fl.yelpcdn.com/bphoto/5o3z0CfFVPvfRDW9ei3uYg/o.jpg",
        uploader_id = 1,
        business_id = 1,
        review_id = None
    )
    image_2 = Image(
        url = "https://s3-media0.fl.yelpcdn.com/bphoto/Roj6QcWeG0VW2B1-Ny5HVw/o.jpg",
        uploader_id = 1,
        business_id = 2,
        review_id = None
    )
    image_3 = Image(
        url = "https://s3-media0.fl.yelpcdn.com/bphoto/4NvoTHZ5xcoTdZxp9nWglw/o.jpg",
        uploader_id = 3,
        business_id = None,
        review_id = 1
    )

    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()