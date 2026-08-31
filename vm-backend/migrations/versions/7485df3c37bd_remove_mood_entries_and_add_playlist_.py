"""remove mood entries and add playlist user

Revision ID: 7485df3c37bd
Revises: eb5c40efeac7
Create Date: 2026-08-29 02:32:28.233730

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '7485df3c37bd'
down_revision: Union[str, Sequence[str], None] = 'eb5c40efeac7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add the new owner column as nullable while existing rows are backfilled.
    op.add_column('playlists', sa.Column('user_id', sa.Integer(), nullable=True))

    # Preserve playlist ownership before removing mood_entries.
    op.execute(
        """
        UPDATE playlists AS playlist
        SET user_id = mood_entry.user_id
        FROM mood_entries AS mood_entry
        WHERE playlist.mood_entry_id = mood_entry.id
        """
    )

    op.alter_column(
        'playlists',
        'user_id',
        existing_type=sa.Integer(),
        nullable=False,
    )
    op.create_index(op.f('ix_playlists_user_id'), 'playlists', ['user_id'], unique=False)
    op.create_foreign_key(
        op.f('playlists_user_id_fkey'),
        'playlists',
        'users',
        ['user_id'],
        ['id'],
    )

    op.drop_constraint(op.f('playlists_mood_entry_id_fkey'), 'playlists', type_='foreignkey')
    op.drop_index(op.f('ix_playlists_mood_entry_id'), table_name='playlists')
    op.drop_column('playlists', 'mood_entry_id')

    op.drop_index(op.f('ix_mood_entries_user_id'), table_name='mood_entries')
    op.drop_table('mood_entries')


def downgrade() -> None:
    """Downgrade schema."""
    op.create_table('mood_entries',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('energetic', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('happy', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('calm', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('anxious', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('sad', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('angry', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.CheckConstraint('angry >= 1 AND angry <= 5', name=op.f('ck_mood_entries_angry_range')),
    sa.CheckConstraint('anxious >= 1 AND anxious <= 5', name=op.f('ck_mood_entries_anxious_range')),
    sa.CheckConstraint('calm >= 1 AND calm <= 5', name=op.f('ck_mood_entries_calm_range')),
    sa.CheckConstraint('energetic >= 1 AND energetic <= 5', name=op.f('ck_mood_entries_energetic_range')),
    sa.CheckConstraint('happy >= 1 AND happy <= 5', name=op.f('ck_mood_entries_happy_range')),
    sa.CheckConstraint('sad >= 1 AND sad <= 5', name=op.f('ck_mood_entries_sad_range')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('mood_entries_user_id_fkey')),
    sa.PrimaryKeyConstraint('id', name=op.f('mood_entries_pkey'))
    )
    op.create_index(op.f('ix_mood_entries_user_id'), 'mood_entries', ['user_id'], unique=False)

    # Mood values cannot be recovered after the upgrade, so create one neutral
    # mood entry for each playlist owner when downgrading.
    op.execute(
        """
        INSERT INTO mood_entries (
            user_id, energetic, created_at, happy, calm, anxious, sad, angry
        )
        SELECT DISTINCT user_id, 1, NOW(), 1, 1, 1, 1, 1
        FROM playlists
        """
    )

    op.add_column(
        'playlists',
        sa.Column('mood_entry_id', sa.Integer(), nullable=True),
    )
    op.execute(
        """
        UPDATE playlists AS playlist
        SET mood_entry_id = (
            SELECT MIN(mood_entry.id)
            FROM mood_entries AS mood_entry
            WHERE mood_entry.user_id = playlist.user_id
        )
        """
    )
    op.alter_column(
        'playlists',
        'mood_entry_id',
        existing_type=sa.Integer(),
        nullable=False,
    )
    op.create_index(
        op.f('ix_playlists_mood_entry_id'),
        'playlists',
        ['mood_entry_id'],
        unique=False,
    )
    op.create_foreign_key(
        op.f('playlists_mood_entry_id_fkey'),
        'playlists',
        'mood_entries',
        ['mood_entry_id'],
        ['id'],
    )

    op.drop_constraint(op.f('playlists_user_id_fkey'), 'playlists', type_='foreignkey')
    op.drop_index(op.f('ix_playlists_user_id'), table_name='playlists')
    op.drop_column('playlists', 'user_id')
