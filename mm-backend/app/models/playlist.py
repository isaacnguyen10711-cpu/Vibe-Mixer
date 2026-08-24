from sqlmodel import SQLModel, Field
from typing import ClassVar

class Playlist (SQLModel, table=True):
    __tablename__: ClassVar[str ]= "playlists"
    
    #Generate columns for the playlists table in the database.
    id: int | None = Field(default=None, primary_key=True)
    mood_entry_id: int = Field(foreign_key="mood_entries.id", index=True, not_null=True)
    user_id: int | None = Field(foreign_key="users.id", index=True)
    name: str = Field(max_length=100, not_null=True)
    description: str | None = Field(default=None, max_length=255)
    created_at: str = Field(max_length=50, not_null=True)