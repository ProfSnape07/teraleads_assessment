from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import models, schemas, crud, database, chatbot, auth
from .dependencies import get_db

app = FastAPI()
models.Base.metadata.create_all(bind=database.engine)


@app.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed = auth.hash_password(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/patients/", response_model=list[schemas.Patient])
def read_patients(db: Session = Depends(get_db), _current_user: models.User = Depends(auth.get_current_user)):
    return crud.get_patients(db)


@app.get("/patients/{patient_id}", response_model=schemas.Patient)
def read_patients(patient_id: int, db: Session = Depends(get_db),
                  _current_user: models.User = Depends(auth.get_current_user)):
    return crud.get_patient(db, patient_id)


@app.post("/patients/", response_model=schemas.Patient)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db),
                   _current_user: models.User = Depends(auth.get_current_user)):
    return crud.create_patient(db, patient)


@app.put("/patients/{patient_id}", response_model=schemas.Patient)
def update_patient(patient_id: int, patient: schemas.PatientCreate, db: Session = Depends(get_db),
                   _current_user: models.User = Depends(auth.get_current_user)):
    return crud.update_patient(db, patient_id, patient)


@app.delete("/patients/{patient_id}", response_model=schemas.Patient)
def delete_patient(patient_id: int, db: Session = Depends(get_db),
                   _current_user: models.User = Depends(auth.get_current_user)):
    return crud.delete_patient(db, patient_id)


@app.post("/chatbot/")
def chat(question: dict, _current_user: models.User = Depends(auth.get_current_user)):
    q = question.get("question", "")
    return {"response": chatbot.mock_chatbot_response(q)}
