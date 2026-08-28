from sqlmodel import SQLModel, Field
from enum import StrEnum
    

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


    
