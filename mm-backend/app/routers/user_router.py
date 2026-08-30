from fastapi import APIRouter
from app.dependencies import AuthorizedUser, DatabaseSession
from app.models.user import UserProfileResponse
from app.models.playlist import Playlist
from sqlmodel import select

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/profile")
async def view_profile(current_user: AuthorizedUser, db: DatabaseSession) -> UserProfileResponse:
    
    playlist = select(Playlist).where(Playlist.user_id == current_user.id).order_by(Playlist.created_at.desc())
    result = await db.exec(playlist)
    all_playlist = result.all()
    
    return UserProfileResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        playlists=all_playlist,
        created_at=current_user.created_at
    )
    