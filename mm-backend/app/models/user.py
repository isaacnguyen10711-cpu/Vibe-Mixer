from sqlmodel import SQLModel, Field
from typing import ClassVar

class User (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "users"
    
    #Generate columns for the users table in the database.
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, unique=True, index=True, not_null=True)
    email: str = Field(max_length=100, unique=True, index=True, not_null=True)
    hashed_password: str = Field(max_length=255, not_null=True)
    created_at: str = Field(max_length=50, not_null=True)
    