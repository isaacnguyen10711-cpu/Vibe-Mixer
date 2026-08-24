from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import SQLModel
from app.config import settings
from app.models.user import User


#Create an async engine that will be used to connect to the database.
engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True, echo=False)

#This creates a new async SQLModel session for each request.
SessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, autoflush=False, expire_on_commit=False)

async def create_db_and_tables() -> None:
    async with engine.begin() as connection:
        #Create the database tables if they don't exist.
        await connection.run_sync(SQLModel.metadata.create_all)