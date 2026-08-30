from fastapi import APIRouter
from app.dependencies import AuthorizedUser
from app.models.user import User, UserResponse

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/profile", response_model=UserResponse)
async def view_profile(current_user: AuthorizedUser) -> User:
    return current_user
    
