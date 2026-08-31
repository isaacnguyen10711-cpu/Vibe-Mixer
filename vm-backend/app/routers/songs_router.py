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
    playlist_query = select(Playlist).where(Playlist.id == playlist_id, Playlist.user_id == user.id)
    playlist_result = await db.exec(playlist_query)
    playlist = playlist_result.first()
    if playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found.")
    
    songs_query = select(Songs).where(Songs.playlist_id == playlist_id)
    result = await db.exec(songs_query)
    songs = result.all()
    return songs
