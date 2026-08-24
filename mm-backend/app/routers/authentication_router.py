from fastapi import APIRouter, HTTPException
from pwdlib import PasswordHash
from starlette.status import HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST
from app.dependencies import DatabaseSession
from app.models.user import UserRequest, UserResponse, TokenResponse, User
from sqlmodel import select

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

#Create a password hasher instance using the recommended hashing algorithm.
password_hasher = PasswordHash.recommended()

@router.post("/register", response_model=UserResponse, status_code=HTTP_201_CREATED)
async def register(request: UserRequest, db: DatabaseSession):
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
    return new_user


@router.post("/login")
async def login():
    return {"message": "Login endpoint"}
