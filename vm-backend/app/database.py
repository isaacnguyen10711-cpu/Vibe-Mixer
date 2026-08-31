from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from app.config import settings


#Create an async engine that will be used to connect to the database.
engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True, echo=False)

#This creates a new async SQLModel session for each request.
SessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, autoflush=False, expire_on_commit=False)
