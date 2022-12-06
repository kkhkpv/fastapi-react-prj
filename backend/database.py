import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(DATABASE_URL, connect_args={
    "check_same_thread": False})

SesscionLocal = sessionmaker(
    bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()
