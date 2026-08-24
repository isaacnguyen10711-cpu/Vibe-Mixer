from collections.abc import AsyncIterator
from typing import Annotated
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import SessionLocal


#Open one async session for a request and close it when the request ends.
async def get_db() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session


#Dependency that can be injected into a router
DatabaseSession = Annotated[AsyncSession, Depends(get_db)]
