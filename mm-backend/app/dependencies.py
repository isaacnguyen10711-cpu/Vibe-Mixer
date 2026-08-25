from collections.abc import AsyncIterator
from typing import Annotated
from fastapi import Depends, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED
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

#oauth2_scheme receives the token from the Authorization header and passes it to the get_current_user function.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
Token = Annotated[str, Depends(oauth2_scheme)]

#Verify the JWT token and retrieve the user from the database
async def get_current_user(token: Token, db: DatabaseSession) -> User:
    try:
        #Decode the JWT token to get the user ID and verify its validity.
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token")
        #Convert the user ID to an integer to ensure it is in the correct format.
        user_id = int(user_id)
        
    except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except (jwt.PyJWTError, ValueError, TypeError):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token")

    #Retrieve the user from the database using the user ID to return the user obj
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user 

AuthorizedUser = Annotated[User, Depends(get_current_user)]
