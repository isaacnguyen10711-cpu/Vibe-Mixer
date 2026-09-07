from sqlmodel import SQLModel, Field, Relationship
from typing import ClassVar
from datetime import UTC, datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .playlist import Playlist
  
class Songs(SQLModel, table=True):
    __tablename__: ClassVar[str ]= "songs"
    
    #Generate columns for the songs table in the database.
    id: int | None = Field(default=None, primary_key=True)
    playlist_id: int = Field(foreign_key="playlists.id", ondelete="CASCADE", index=True)
    title: str = Field(max_length=100)
    artist: str = Field(max_length=100)
    duration: int | None = Field(default=None, ge=0)
    youtube_url: str | None = Field(default=None, max_length=255)
    thumbnail_url: str | None = Field(default=None, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    playlist: "Playlist" = Relationship(back_populates="songs")
    
class GeneratedSong(SQLModel):
    title: str
    artist: str
    description: str | None = Field(default=None, max_length=255)
    duration: int | None = Field(default=None, ge=0)
    youtube_url: str | None = Field(default=None, max_length=255)
    thumbnail_url: str | None = Field(default=None, max_length=255)
