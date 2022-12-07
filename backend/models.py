import datetime as dt

import sqlalchemy as sql
import sqlalchemy.orm as orm
import passlib.hash as hash

import database


class User(database.Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True, index=True)
    email = sql.Column(sql.String, unique=True, index=True)
    hashed_password = sql.Column(sql.String)

    contacts = orm.relationship("Contact", back_populates="owner")

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)


class Contact(database.Base):
    __tablename__ = "contacts"
    id = sql.Column(sql.Integer, primary_key=True, index=True)
    owner_id = sql.Column(sql.Integer, sql.ForeignKey("users.id"))
    first_name = sql.Column(sql.String, index=True)
    last_name = sql.Column(sql.String, index=True)
    email = sql.Column(sql.String, index=True)
    phone_number = sql.Column(sql.String, index=True)
    address = sql.Column(sql.String, index=True)
    created_at = sql.Column(sql.DateTime, default=dt.datetime.utcnow)

    owner = orm.relationship("User", back_populates="contacts")
