import sqlalchemy.orm as orm
import database as db
from models import *


def create_database():
    return db.Base.metadata.create_all(bind=db.engine)


def get_db():
    dbase = db.SesscionLocal()
    try:
        yield dbase
    finally:
        dbase.close()


async def get_user_by_email(email: str, dbase: orm.Session):
    return dbase.query(User).filter(User.email == email).first()
