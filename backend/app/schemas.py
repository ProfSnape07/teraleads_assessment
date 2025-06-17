from datetime import date

from pydantic import BaseModel, EmailStr


class PatientBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    dob: date
    gender: bool
    notes: str | None = None


class PatientCreate(PatientBase):
    pass


class Patient(PatientBase):
    id: int

    model_config = {"from_attributes": True}


class UserCreate(BaseModel):
    username: str
    password: str
    # role: str


class User(BaseModel):
    id: int
    username: str
    role: str

    model_config = {"from_attributes": True}

class Query(BaseModel):
    query: str

class Response(BaseModel):
    query: str
    reply: str
