from fastapi import Depends, security, HTTPException
import jwt
import passlib.hash as hash
import sqlalchemy.orm as orm
import database
import models
import schemas
from config import JWT_SECRET

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/api/token")


def create_database():
    return database.Base.metadata.create_all(bind=database.engine)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: orm.Session):
    return db.query(models.User).filter(models.User.email == email).first()


async def create_user(user: schemas.UserCreate, db: orm.Session):
    user_obj = models.User(
        email=user.email, hashed_password=hash.bcrypt.hash(user.password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: orm.Session):
    user = await get_user_by_email(email, db)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_current_user(db: orm.Session = Depends(get_db), token: str = Depends(oauth2schema)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise HTTPException(status_code=401, detail="Wrong email or password")

    return schemas.User.from_orm(user)


async def create_contact(user: schemas.User, db: orm.Session, contact: schemas.ContactCreate):
    contact = models.Contact(**contact.dict(), owner_id=user.id)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return schemas.Contact.from_orm(contact)


async def get_contacts(user: schemas.User, db: orm.Session):
    contacts = db.query(models.Contact).filter_by(owner_id=user.id)

    return list(map(schemas.Contact.from_orm, contacts))


async def select_contact_by_id(id: int, user: schemas.User, db: orm.Session):
    contact = db.query(models.Contact).filter_by(
        owner_id=user.id).filter(models.Contact.id == id).first()

    if contact is None:
        raise HTTPException(status_code=404, detail="Contact doesn't exist")

    return contact


async def get_contact_by_id(id: int, user: schemas.User, db: orm.Session):
    contact = await select_contact_by_id(id, user, db)
    return schemas.Contact.from_orm(contact)


async def delete_contact(id: int, user: schemas.User, db: orm.Session):
    contact = await select_contact_by_id(id, user, db)

    db.delete(contact)
    db.commit()


async def update_contact(id: int, contact: schemas.ContactCreate, user: schemas.User, db: orm.Session):
    contact_to_update = await select_contact_by_id(id, user, db)

    contact_to_update.first_name = contact.first_name
    contact_to_update.last_name = contact.last_name
    contact_to_update.address = contact.address
    contact_to_update.email = contact.email
    contact_to_update.phone_number = contact.phone_number

    db.commit()
    db.refresh(contact_to_update)

    return schemas.Contact.from_orm(contact_to_update)
