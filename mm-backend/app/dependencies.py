from collections.abc import AsyncIterator
from typing import Annotated
from fastapi import Depends, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED
from app.models.user import User
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
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

#bearer_scheme receives the token from the Authorization header and passes it to the get_current_user function.
bearer_scheme = HTTPBearer() 
Credentials = Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)]
    
async def get_current_user(credentials: Credentials, db: DatabaseSession) -> User:
    token = credentials.credentials
    try:
        #Decode the JWT token to get the user ID and verify its validity.
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token")
        #Convert the user ID to an integer to ensure it is in the correct format.
        user_id = int(user_id)
        
    except (jwt.PyJWTError, ValueError, TypeError):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token")

    #Retrieve the user from the database using the user ID obtained from the token and validate that the user exists.
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user 

AuthorizedUser = Annotated[User, Depends(get_current_user)]
