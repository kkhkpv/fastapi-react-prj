import datetime as dt

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class ContactBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: str


class ContactCreate(ContactBase):
    pass


class Contact(ContactBase):
    id: int
    owner_id: int
    created_at: dt.datetime

    class Config:
        orm_mode = True
