from fastapi import APIRouter, HTTPException, Depends
from starlette.status import HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from app.dependencies import DatabaseSession, AuthorizedUser
from app.models.user import UserRegistrationRequest, UserResponse, TokenResponse, User
from sqlmodel import select
from app.services.authentication_service import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

#Create a password hasher instance using the recommended hashing algorithm.
password_hasher = PasswordHash.recommended()

@router.post("/register", response_model=UserResponse, status_code=HTTP_201_CREATED)
async def register(request: UserRegistrationRequest, db: DatabaseSession) -> UserResponse:
    #Check if email or username already exists in the database.
    query = select(User).where((User.email == request.email) | (User.username == request.username))
    existing_user = await db.exec(query)
    existing_user = existing_user.first()
    
    if existing_user:
        raise HTTPException(status_code=HTTP_409_CONFLICT, detail="Email or username already exists.")
    
    #Validate the password length and complexity.
    if len(request.password) < 8:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters long.")
    
    #Hash the password before storing it in the database.
    hashed_password = password_hasher.hash(request.password)
    #Create a new user instance and save it to the database.
    new_user = User(
        email=request.email,
        username=request.username,
        hashed_password=hashed_password
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return UserResponse(
        id=new_user.id,
        email=new_user.email,
        username=new_user.username,
        created_at=new_user.created_at
    )


@router.post("/login", response_model=TokenResponse)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: DatabaseSession) -> TokenResponse:
    
    query = select(User).where((User.email == form_data.username) | (User.username == form_data.username))
    user = await db.exec(query)
    user = user.first()

    if not user or not password_hasher.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    access_token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=access_token, token_type="bearer")
