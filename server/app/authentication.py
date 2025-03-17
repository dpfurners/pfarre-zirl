import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, Request, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models import User
from app.routers.auth import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Use a string for the default key.
SECRET_KEY = os.getenv("SECRET_KEY", "kljashdf8o32hiusdhadf890723")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
