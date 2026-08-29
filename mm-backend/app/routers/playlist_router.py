from fastapi import APIRouter, HTTPException
from app.dependencies import DatabaseSession, AuthorizedUser
from app.models.mood_entry import MoodEntryRequest
from app.models.songs import Songs
from app.models.playlist import Playlist, GeneratedPlaylist
from app.models.songs import GeneratedSong
from sqlmodel import select
from app.services.openai_service import generate_playlist_with_OpenAI
from app.services.youtube_service import search_youtube_video


router = APIRouter(
    prefix="/playlist",
    tags=["Playlist"]
)

@router.post("/generate-playlist")
async def generate_playlist(request: MoodEntryRequest):
    #Validate the mood values in the request.
    try:
        playlist = await generate_playlist_with_OpenAI(request)
        for song in playlist.songs:
            #Search for the song on YouTube and retrieve its video ID, description, thumbnail URL, and duration.
            video_data = await search_youtube_video(f"{song.title} by {song.artist}")
            song.description = video_data['description']
            song.youtube_url = f"https://www.youtube.com/watch?v={video_data['video_id']}"
            song.thumbnail_url = video_data['thumbnail_url']
            song.duration = video_data['duration']
        return playlist
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to generate playlist: {str(e)}")
    
    
@router.post("/save-playlist")
async def save_playlist(playlist: GeneratedPlaylist, db: DatabaseSession, user: AuthorizedUser):
    new_playlist = Playlist(
        name=playlist.name,
        description=playlist.description,
        user_id=user.id
    )
    
    db.add(new_playlist)
    
    #Flush the session to get the new playlist ID before adding songs.
    await db.flush()

    if new_playlist.id is None:
        raise HTTPException(status_code=400, detail="Failed to create playlist.")
    
    for song in playlist.songs:
        new_song = Songs(
            title=song.title,
            artist=song.artist,
            duration=song.duration,
            youtube_url=song.youtube_url,
            thumbnail_url=song.thumbnail_url,
            playlist_id=new_playlist.id
        )
        db.add(new_song)
    
    await db.commit()
    await db.refresh(new_playlist)
    return new_playlist
