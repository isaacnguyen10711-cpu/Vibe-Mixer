from collections.abc import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from typing import Annotated


from app.database import SessionLocal


#Open one session for a request and close it automatically when the request ends.
async def get_db() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session


#Routers can use `db: DatabaseSession` to receive the request's session.
DatabaseSession = Annotated[AsyncSession, Depends(get_db)]
