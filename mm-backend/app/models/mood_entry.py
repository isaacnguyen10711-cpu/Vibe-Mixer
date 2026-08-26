from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime
from enum import StrEnum

class MoodEntry (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "mood_entries"
    
    #Generate columns for the mood_entries table in the database.
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    happy: int = Field(default=1, ge=1, le=10)
    energetic: int = Field(default=1, ge=1, le=10)
    calm: int = Field(default=1, ge=1, le=10)
    anxious: int = Field(default=1, ge=1, le=10)
    sad: int = Field(default=1, ge=1, le=10)
    angry: int = Field(default=1, ge=1, le=10)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    

class MusicMarket(StrEnum):
    USUK = "usuk"
    VPOP = "vpop"
    KPOP = "kpop"
    

class MoodEntryRequest(SQLModel):
    happy: int = Field(default=1, ge=1, le=10)
    energetic: int = Field(default=1, ge=1, le=10)
    calm: int = Field(default=1, ge=1, le=10)
    anxious: int = Field(default=1, ge=1, le=10)
    sad: int = Field(default=1, ge=1, le=10)
    angry: int = Field(default=1, ge=1, le=10)
    music_market: MusicMarket = MusicMarket.USUK


    
