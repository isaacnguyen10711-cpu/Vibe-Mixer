"""remove is favorite from songs

Revision ID: b18c7d4e9a21
Revises: fee26b21f658
Create Date: 2026-09-06

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b18c7d4e9a21"
down_revision: Union[str, Sequence[str], None] = "fee26b21f658"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("songs", "is_favorite")


def downgrade() -> None:
    op.add_column(
        "songs",
        sa.Column(
            "is_favorite",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )
