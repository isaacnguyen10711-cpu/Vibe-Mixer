from sqlmodel import SQLModel, Field
from sqlalchemy import CheckConstraint
from typing import ClassVar
from datetime import UTC, datetime
from enum import StrEnum

class MoodEntry (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "mood_entries"
    __table_args__ = (
        CheckConstraint("happy BETWEEN 1 AND 5", name="ck_mood_entries_happy_range"),
        CheckConstraint("energetic BETWEEN 1 AND 5", name="ck_mood_entries_energetic_range"),
        CheckConstraint("calm BETWEEN 1 AND 5", name="ck_mood_entries_calm_range"),
        CheckConstraint("anxious BETWEEN 1 AND 5", name="ck_mood_entries_anxious_range"),
        CheckConstraint("sad BETWEEN 1 AND 5", name="ck_mood_entries_sad_range"),
        CheckConstraint("angry BETWEEN 1 AND 5", name="ck_mood_entries_angry_range"),
    )
    
    #Generate columns for the mood_entries table in the database.
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    happy: int = Field(default=1, ge=1, le=5)
    energetic: int = Field(default=1, ge=1, le=5)
    calm: int = Field(default=1, ge=1, le=5)
    anxious: int = Field(default=1, ge=1, le=5)
    sad: int = Field(default=1, ge=1, le=5)
    angry: int = Field(default=1, ge=1, le=5)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    

class MusicMarket(StrEnum):
    USUK = "usuk"
    VPOP = "vpop"
    KPOP = "kpop"
    

class MoodEntryRequest(SQLModel):
    happy: int = Field(default=1, ge=1, le=5)
    energetic: int = Field(default=1, ge=1, le=5)
    calm: int = Field(default=1, ge=1, le=5)
    anxious: int = Field(default=1, ge=1, le=5)
    sad: int = Field(default=1, ge=1, le=5)
    angry: int = Field(default=1, ge=1, le=5)
    music_market: MusicMarket = MusicMarket.USUK


    
