from fastapi import APIRouter, HTTPException
from app.dependencies import DatabaseSession, AuthorizedUser
from app.models.songs import Songs
from app.models.playlist import Playlist, GeneratedPlaylist
from app.models.songs import GeneratedSong
from sqlmodel import select

router = APIRouter(
    prefix="/playlist-songs",
    tags=["Songs"]
)

@router.get("/get-songs/{playlist_id}")
async def get_songs(playlist_id: int, db: DatabaseSession, user: AuthorizedUser):
    query = select(Songs).where(Songs.playlist_id == playlist_id)
    result = await db.exec(query)
    songs = result.all()
    return songs
