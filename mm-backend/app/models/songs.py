from sqlmodel import SQLModel, Field
from typing import ClassVar

class Songs(SQLModel, table=True):
    __tablename__: ClassVar[str ]= "songs"
    
    #Generate columns for the songs table in the database.
    id: int | None = Field(default=None, primary_key=True)
    playlist_id: int = Field(foreign_key="playlists.id", index=True, not_null=True)
    title: str = Field(max_length=100, not_null=True)
    artist: str = Field(max_length=100, not_null=True)
    album: str | None = Field(default=None, max_length=100)
    genre: str | None = Field(default=None, max_length=50)
    duration: int | None = Field(default=None, ge=0)
    created_at: str = Field(max_length=50, not_null=True)