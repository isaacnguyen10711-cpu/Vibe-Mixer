from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.routers import authentication_router, playlist_router, songs_router, user_router

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.services.rate_limiter_service import limiter

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    #close the database connection when the application shuts down.
    await engine.dispose()

# The application instance imported and the lifespan function is passed to the FastAPI constructor to manage the application's lifespan events.
app = FastAPI(title="Vibe Mixer API", lifespan=lifespan)

@app.get("/")
async def health_check():
    return {"status": "Vibe Mixer API is running"}

app.include_router(authentication_router.router)
app.include_router(playlist_router.router)
app.include_router(songs_router.router)
app.include_router(user_router.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://vibe-mixer-iota.vercel.app/"],  # Adjust this to your frontend's origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
