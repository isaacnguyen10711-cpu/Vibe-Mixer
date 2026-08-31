from sqlmodel import SQLModel, Field
from typing import ClassVar
from datetime import UTC, datetime
from app.models.songs import GeneratedSong

class Playlist (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "playlists"
    
    #Generate columns for the playlists table in the database.
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    name: str = Field(max_length=100)
    description: str | None = Field(default=None, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    
#For generated playlist response from OpenAI
class GeneratedPlaylist(SQLModel):
    name: str
    description: str
    songs: list[GeneratedSong]

#For playlist response from the database to return in user profile
class PlaylistResponse(SQLModel):
    id: int
    name: str
    description: str | None
    created_at: datetime