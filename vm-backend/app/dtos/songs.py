from sqlmodel import SQLModel, Field

class GeneratedSong(SQLModel):
    video_id: str | None = Field(default=None, max_length=70)
    title: str = Field(max_length=100)
    artist: str = Field(max_length=100)
    description: str | None = Field(default=None, max_length=255)
    duration: int | None = Field(default=None, ge=0)
    youtube_url: str | None = Field(default=None, max_length=255)
    thumbnail_url: str | None = Field(default=None, max_length=255)
