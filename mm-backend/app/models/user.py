from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime

class User(SQLModel, table=True):
    __tablename__: ClassVar[str] = "users"
    
    #Generate columns for the users table in the database.
    id: int | None = Field(default=None, primary_key=True)
    username: str | None = Field(default=None, max_length=50, unique=True, index=True)
    email: str = Field(max_length=100, unique=True, index=True)
    hashed_password: str = Field(max_length=255) 
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    
#for user registration request
class UserRegistrationRequest(SQLModel):
    email: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=128)

class UserResponse(SQLModel):
    id: int
    username: str | None
    email: str
    created_at: datetime


class TokenResponse(SQLModel):
    access_token: str
    token_type: str
     
