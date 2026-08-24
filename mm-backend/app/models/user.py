from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime

class User (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "users"
    
    #Generate columns for the users table in the database.
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, unique=True, index=True)
    email: str = Field(max_length=100, unique=True, index=True)
    hashed_password: str = Field(max_length=255) 
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    

class UserCreateRequest(SQLModel):
    username: str = Field(max_length=50)
    email: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=128)

class UserResponse(SQLModel):
    id: int
    username: str
    email: str
    created_at: datetime
    
     