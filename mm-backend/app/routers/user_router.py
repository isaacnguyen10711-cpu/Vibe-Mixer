from fastapi import APIRouter
from app.dependencies import AuthorizedUser, DatabaseSession
from app.models.user import User, UserResponse, UserUpdateRequest

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/profile", response_model=UserResponse)
async def view_profile(current_user: AuthorizedUser) -> User:
    return current_user

@router.put("/profile", response_model=UserResponse)
async def update_profile(current_user: AuthorizedUser, updated_user: UserUpdateRequest, db: DatabaseSession) -> User:
    current_user.username = updated_user.username
    current_user.email = updated_user.email
    
    await db.commit()
    await db.refresh(current_user)
    
    return current_user
    
