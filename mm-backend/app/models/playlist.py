from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime

class Playlist (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "playlists"
    
    #Generate columns for the playlists table in the database.
    id: int | None = Field(default=None, primary_key=True)
    mood_entry_id: int = Field(foreign_key="mood_entries.id", index=True)
    name: str = Field(max_length=100)
    description: str | None = Field(default=None, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    

class GeneratedSong(SQLModel):
    title: str
    artist: str
    
class GeneratedPlaylist(SQLModel):
    name: str
    description: str
    songs: list[GeneratedSong]