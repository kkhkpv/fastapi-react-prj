from fastapi import FastAPI, Depends, HTTPException
import fastapi.security as security

import sqlalchemy.orm as orm

from services import *

from schemas import *

app = FastAPI()


@app.post("/api/users")
async def create_user(user: UserCreate, db: orm.Session = Depends(get_db)):
    db_user = get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists")
