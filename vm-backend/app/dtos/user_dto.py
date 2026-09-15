from datetime import datetime
from sqlmodel import SQLModel, Field

#for user registration request
class UserRegistrationRequest(SQLModel):
    email: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=128)

class UserResponse(SQLModel):
    id: int
    username: str | None = Field(max_length=50)
    email: str = Field(max_length=100)
    created_at: datetime


class TokenResponse(SQLModel):
    access_token: str
    token_type: str
    
class UserUpdateRequest(SQLModel):
    username: str | None = Field(default=None, max_length=50)
    email: str | None = Field(default=None, max_length=100)
