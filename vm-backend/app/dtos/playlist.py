from datetime import datetime
from sqlmodel import SQLModel
from app.dtos.songs import GeneratedSong

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


class PlaylistUpdateRequest(SQLModel):
    name: str
    description: str
