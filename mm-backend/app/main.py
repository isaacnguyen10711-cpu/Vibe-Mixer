from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    #close the database connection when the application shuts down.
    await engine.dispose()

# The application instance imported and the lifespan function is passed to the FastAPI constructor to manage the application's lifespan events.
app = FastAPI(title="Mood Mixer API", lifespan=lifespan)
