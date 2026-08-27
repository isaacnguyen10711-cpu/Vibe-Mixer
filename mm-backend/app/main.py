from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.routers import authentication_router, playlist_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    #close the database connection when the application shuts down.
    await engine.dispose()

# The application instance imported and the lifespan function is passed to the FastAPI constructor to manage the application's lifespan events.
app = FastAPI(title="Mood Mixer API", lifespan=lifespan)

app.include_router(authentication_router.router)
app.include_router(playlist_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to your frontend's origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
