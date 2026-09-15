from datetime import datetime
from sqlmodel import SQLModel, Field
from app.dtos.songs import GeneratedSong

#For generated playlist response from OpenAI
class GeneratedPlaylist(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=255)
    songs: list[GeneratedSong]

#For playlist response from the database to return in user profile
class PlaylistResponse(SQLModel):
    id: int
    name: str = Field(max_length=100)
    description: str | None = Field(max_length=255)
    created_at: datetime


class PlaylistUpdateRequest(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=255)
