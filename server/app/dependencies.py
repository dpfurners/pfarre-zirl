from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.models import User
from app.database import get_db


def get_token(request: Request):
    token = request.cookies.get("token")
    return token


def get_user(db: Session = Depends(get_db), token_data: dict = Depends(get_token)):
    username = token_data.get("sub")
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
