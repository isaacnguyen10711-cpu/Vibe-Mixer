from fastapi import APIRouter, HTTPException
from app.dependencies import DatabaseSession, AuthorizedUser
from app.models.mood_entry import MoodEntryRequest
from sqlmodel import select
from app.services.openai_service import generate_playlist_with_OpenAI


router = APIRouter(
    prefix="/mood",
    tags=["Mood Entries"]
)

@router.post("/generate-playlist")
async def generate_playlist(request: MoodEntryRequest):
    #Validate the mood values in the request.
    try:
        playlist = await generate_playlist_with_OpenAI(request)
        return playlist
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
 
