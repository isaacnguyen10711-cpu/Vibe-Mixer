from collections.abc import AsyncIterator
from typing import Annotated
from fastapi import Depends, HTTPException
from app.models.user import User
from fastapi.security import OAuth2PasswordBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import SessionLocal
from app.config import settings
import jwt


#Open one async session for a request and close it when the request ends.
async def get_db() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session


#Dependency that can be injected into a router
DatabaseSession = Annotated[AsyncSession, Depends(get_db)]


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
Token = Annotated[str, Depends(oauth2_scheme)]
    
async def get_current_user(token: Token, db: DatabaseSession) -> User:
    try:
        #Decode the JWT token to get the user ID and verify its validity.
        payload = jwt.decode(token, settings.jwt_secret_key, settings.jwt_algorithm)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user_id = int(user_id)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    #Retrieve the user from the database using the user ID obtained from the token and validate that the user exists.
    user = await db.get(User, int(user_id))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

AuthorizedUser = Annotated[User, Depends(get_current_user)]
