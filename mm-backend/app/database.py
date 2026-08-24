from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

#The engine owns the connection pool used to communicate with Neon PostgreSQL.
engine = create_async_engine(settings.DATABASE_URL, echo=False)

#This factory creates a new asynchronous database session for each request.
SessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, autoflush=False, expire_on_commit=False,
)

#All future SQLAlchemy entity models inherit from this base.
class Base(DeclarativeBase):
    pass
 