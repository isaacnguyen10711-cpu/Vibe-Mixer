from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime
  
class Songs(SQLModel, table=True):
    __tablename__: ClassVar[str ]= "songs"
    
    #Generate columns for the songs table in the database.
    id: int | None = Field(default=None, primary_key=True)
    playlist_id: int = Field(foreign_key="playlists.id", index=True)
    title: str = Field(max_length=100)
    artist: str = Field(max_length=100)
    album: str | None = Field(default=None, max_length=100)
    genre: str | None = Field(default=None, max_length=50)
    duration: int | None = Field(default=None, ge=0)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))