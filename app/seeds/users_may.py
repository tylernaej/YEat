from app.models import db, User

def seed_usersv2():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password', profile_picture='https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg')

    connor = User(
        first_name='Connor', last_name='Lam', username='cLam', email='connor@aa.io', password='password', profile_picture='https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc')
    tyler = User(
        first_name='Tyler', last_name='Jean', username='tJean', email='tyler@aa.io', password='password', profile_picture='https://avatars.githubusercontent.com/u/104518737?s=400&u=62e1ffcb888bfa1a9ed7a13e82058c2718962c73&v=4')
    edward = User(
        first_name='Edward', last_name='Felipe', username='eFelipe', email='edward@aa.io', password='password', profile_picture='https://avatars.githubusercontent.com/u/75222415?s=400&u=c117af6019a7ce2525374cff39a86f6d0bd882c7&v=4')

    aVenida = User(
        first_name='Alec', last_name='Venida', username='aVenida', email='avenida@aa.io', password='password'
    )
    aGonglach = User(
        first_name='Alex', last_name='Gonglach', username='aGonglach', email='agonglach@aa.io', password='password'
    )
    bWaldee = User(
        first_name='Ben', last_name='Waldee', username='bWaldee', email='bwaldee@aa.io', password='password'
    )
    cOu = User(
        first_name='Cecilia', last_name='Ou', username='cOu', email='cou@aa.io', password='password'
    )
    cChen = User(
        first_name='Chen', last_name='Chen', username='cChen', email='cchen@aa.io', password='password'
    )
    dTing = User(
        first_name='David', last_name='Ting', username='dTing', email='dting@aa.io', password='password'
    )
    dHoffman = User(
        first_name='Daniel', last_name='Hoffman', username='dHoffman', email='dhoffman@aa.io', password='password'
    )
    eLee = User(
        first_name='Edgar', last_name='Lee', username='eLee', email='elee@aa.io', password='password'
    )
    eLinzer = User(
        first_name='El', last_name='Linzer', username='eLinzer', email='elinzer@aa.io', password='password'
    )
    fPalacios = User(
        first_name='Francisco', last_name='Palacios', username='fPalacios', email='fpalacios@aa.io', password='password'
    )
    gManiti = User(
        first_name='Giordan', last_name='Maniti', username='gManiti', email='gmaniti@aa.io', password='password'
    )
    jChew = User(
        first_name='Jason', last_name='Chew', username='jChew', email='jchew@aa.io', password='password'
    )
    jJung = User(
        first_name='Julie', last_name='Jung', username='jJung', email='jjung@aa.io', password='password'
    )
    jKam = User(
        first_name='JB', last_name='Kam', username='jKam', email='jkam@aa.io', password='password'
    )
    jJang = User(
        first_name='Justine', last_name='Jang', username='jJang', email='jjang@aa.io', password='password'
    )
    lNazari = User(
        first_name='Ladan', last_name='Nazari', username='lNazari', email='lnazari@aa.io', password='password'
    )
    hGuzzetti = User(
        first_name='Hazel', last_name='Guzzetti', username='hGuzzetti', email='hguzzetti@aa.io', password='password'
    )
    rHenry = User(
        first_name='Ray', last_name='Henry', username='rHenry', email='rhenry@aa.io', password='password'
    )
    rNguyen = User(
        first_name='Rudy', last_name='Nguyen', username='rNguyen', email='rNguyen@aa.io', password='password'
    )
    tYang = User(
        first_name='Tiffany', last_name='Yang', username='tYang', email='tyang@aa.io', password='password'
    )


    bLau = User(
        first_name='Benjamin', last_name='Lau', username='bLau', email='blau@aa.io', password='password'
    )

    aBui =User(
        first_name='An', last_name='Bui', username='aBui', email='abui@aa.io', password='password'
    )

    rChang =User(
        first_name='Randy', last_name='Chang', username='rChang', email='rchang@aa.io', password='password'
    )

    wMarett =User(
        first_name='Will', last_name='Marett', username='wMarett', email='wmarett@aa.io', password='password'
    )

    kHan =User(
        first_name='Kris', last_name='Han', username='kHan', email='khan@aa.io', password='password'
    )

    bSimpson =User(
        first_name='Brad', last_name='Simpson', username='bSimpson', email='bsimpson@aa.io', password='password'
    )


    db.session.add(demo)

    db.session.add(connor)
    db.session.add(tyler)
    db.session.add(edward)

    db.session.add(aVenida)
    db.session.add(aGonglach)
    db.session.add(bWaldee)
    db.session.add(cOu)
    db.session.add(cChen)
    db.session.add(dTing)
    db.session.add(dHoffman)
    db.session.add(eLee)
    db.session.add(eLinzer)
    db.session.add(fPalacios)
    db.session.add(gManiti)
    db.session.add(jChew)
    db.session.add(jJung)
    db.session.add(jKam)
    db.session.add(jJang)
    db.session.add(lNazari)
    db.session.add(hGuzzetti)
    db.session.add(rHenry)
    db.session.add(rNguyen)
    db.session.add(tYang)

    db.session.add(bLau)
    db.session.add(aBui)
    db.session.add(rChang)
    db.session.add(wMarett)
    db.session.add(kHan)
    db.session.add(bSimpson)

    db.session.commit()

def undo_usersv2():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
