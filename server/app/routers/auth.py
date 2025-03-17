from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from app.schemas import UserCreate, Token
from app.models import User
from app.database import get_db
from app.authentication import get_password_hash, create_access_token, verify_password
from app.dependencies import get_user, get_token

router = APIRouter()


@router.post("/register", response_model=Token)
def register(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create the access token
    access_token = create_access_token(data={"sub": new_user.username})

    # Set the token in an HTTPOnly cookie
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=True,          # Use secure cookies in production
        samesite="lax"        # Adjust this based on your cross-site requirements
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login/", response_model=Token)
def login(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    # Create the access token
    access_token = create_access_token(data={"sub": db_user.username})

    # Set the token in an HTTPOnly cookie
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=True,          # Use secure cookies in production
        samesite="lax"        # Adjust as necessary
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout/")
def logout(response: Response):
    response.delete_cookie(key="token")
    return {"message": "Logout successful"}


@router.post("/token/refresh", response_model=Token)
def refresh_token(response: Response, token_data: str = Depends(get_token)):
    # Create the access token
    access_token = create_access_token(data={"sub": token_data.sub}, expires_delta=timedelta(minutes=15))

    # Set the token in an HTTPOnly cookie
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=True,          # Use secure cookies in production
        samesite="lax"        # Adjust as necessary
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/token/revoke")
def revoke_token(response: Response):
    response.delete_cookie(key="token")
    return {"message": "Token revoked"}


@router.get("/me")
def read_users_me(user: str = Depends(get_user)):
    return {"user": user}
