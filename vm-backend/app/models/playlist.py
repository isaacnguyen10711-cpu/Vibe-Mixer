from sqlmodel import SQLModel, Field, Relationship
from typing import ClassVar
from datetime import UTC, datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User
    from .songs import Songs

class Playlist (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "playlists"
    
    #Generate columns for the playlists table in the database.
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    name: str = Field(max_length=100)
    description: str | None = Field(default=None, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    user: "User" = Relationship(back_populates="playlists")
    songs: list["Songs"] = Relationship(back_populates="playlist")
