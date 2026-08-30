from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import AuthorizedUser, DatabaseSession
from app.models.user import UserResponse, User
from sqlmodel import select

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/profile")
async def view_profile(current_user: AuthorizedUser, db: DatabaseSession) -> UserResponse:
    return UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email
    )
    