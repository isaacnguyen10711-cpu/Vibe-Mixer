from openai import AsyncOpenAI
from app.config import settings
from app.models.mood_entry import MoodEntryRequest
from app.models.playlist import GeneratedPlaylist

client = AsyncOpenAI(api_key=settings.OpenAI_API_KEY)

instructions = """
You are a music recommendation expert.

# Goal

Create a cohesive playlist containing exactly 12 distinct songs that
matches the user's mood values and selected music market.

The user provides six mood intensity values from 1 to 10:

- happiness
- energy
- calmness
- anxiety
- sadness
- anger

When mood values conflict, prioritize the moods with the highest
intensity. The playlist should progress naturally from one song to
the next.

# Music markets

Follow the selected music market:

- vpop: Vietnamese pop music
- usuk: music primarily from the United States and United Kingdom
- kpop: Korean pop music

Do not include songs from unrelated music markets unless the song is
a well-known collaboration strongly associated with the selected market.

# Song requirements

Every recommendation must:

- be a real, officially released song
- use the exact official song title
- use the primary artist's correct name
- be famous, popular, trending, or widely recognized within the
  selected music market
- be reasonably easy to find on YouTube
- emotionally and musically match the supplied mood values

Do not invent songs or artists.

Prefer original studio recordings. Avoid remixes, live performances,
covers, sped-up versions, slowed versions, and unofficial uploads unless
the alternate version is itself famous and relevant.

# Playlist variety

Create a fresh combination of songs for every request.

Choose from a broad pool of valid songs instead of repeatedly selecting
only the most obvious global hits.

Vary the following while preserving the mood match:

- artists
- release eras
- subgenres
- musical styles
- emotional intensity
- energy levels

Include a balanced combination of:

- major popular hits
- well-known classics
- recognizable alternatives
- popular or trending songs from recent years

Do not include more than one song by the same primary artist.

Avoid predictable groups of songs that frequently appear together in
generic playlists. However, do not choose obscure songs merely to create
variety. Accuracy, popularity, and mood relevance remain more important
than randomness.

# Playlist information

Give the playlist:

- a short and descriptive name
- a brief description explaining how the playlist matches the user's
  moods and selected music market

Return exactly 12 distinct songs.
"""


async def generate_playlist_with_OpenAI(request: MoodEntryRequest) -> GeneratedPlaylist:
    input = f"""
        User mood values:
        
        - Happy: {request.happy}/10
        - Energetic: {request.energetic}/10
        - Calm: {request.calm}/10
        - Anxious: {request.anxious}/10
        - Sad: {request.sad}/10
        - Angry: {request.angry}/10
    
    Selected music market: {request.music_market.value}
        """
    
    #Send the request to the OpenAI API and parse the response into a GeneratedPlaylist object.
    response = await client.responses.parse(
        model=settings.OpenAI_Model,
        instructions=instructions,
        input=input,
        #Parse the response into a GeneratedPlaylist object
        text_format=GeneratedPlaylist,
        reasoning={"effort": "none"}
    )
    #Extract the parsed playlist from the response and validate its format.
    playlist = response.output_parsed
    
    if not isinstance(playlist, GeneratedPlaylist):
        raise ValueError("Invalid response format from OpenAI API")
    
    return playlist
