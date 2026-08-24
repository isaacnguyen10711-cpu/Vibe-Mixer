from sqlmodel import SQLModel, Field
from typing import ClassVar

class MoodEntry (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "mood_entries"
    
    #Generate columns for the mood_entries table in the database.
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True, not_null=True)
    happiness: int = Field(default=1, ge=1, le=10)
    energetic: int = Field(default=1, ge=1, le=10)
    calming: int = Field(default=1, ge=1, le=10)
    anxiety: int = Field(default=1, ge=1, le=10)
    sadness: int = Field(default=1, ge=1, le=10)
    anger: int = Field(default=1, ge=1, le=10)
    created_at: str = Field(max_length=50, not_null=True)
    