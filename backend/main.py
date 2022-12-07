from fastapi import FastAPI, Depends, HTTPException, security

import sqlalchemy.orm as orm

import services

import schemas

app = FastAPI()


@app.post("/api/users")
async def create_user(user: schemas.UserCreate, db: orm.Session = Depends(services.get_db)):
    db_user = await services.get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists")

    await services.create_user(user, db)

    return await services.create_token(user)


@app.post("/api/token")
async def generate_token(form_data: security.OAuth2PasswordRequestForm = Depends(), db: orm.Session = Depends(services.get_db)):
    user = await services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid creds")

    return await services.create_token(user)


@app.get("/api/users/me", response_model=schemas.User)
async def get_user(user: schemas.User = Depends(services.get_current_user)):
    return user


@app.post("/api/contacts", response_model=schemas.Contact)
async def create_contact(contact: schemas.ContactCreate, user: schemas.User = Depends(services.get_current_user), db: orm.Session = Depends(services.get_db)):
    return await services.create_contact(user, db, contact)


@app.get("/api/contacts", response_model=list[schemas.Contact])
async def get_contacts(user: schemas.User = Depends(services.get_current_user), db: orm.Session = Depends(services.get_db)):
    return await services.get_contacts(user, db)


@app.get("/api/contacts/{id}", status_code=200)
async def get_contact_by_id(id: int, user: schemas.User = Depends(services.get_current_user), db: orm.Session = Depends(services.get_db)):
    pass
