from openai import AsyncOpenAI
from app.config import settings
from app.models.mood_entry import MoodEntryRequest
from app.models.playlist import GeneratedPlaylist

client = AsyncOpenAI(api_key=settings.OpenAI_API_KEY)

instructions = """
You are a music recommendation expert.

You will receive six mood intensity values from 1 to 10:
happiness, energy, calmness, anxiety, sadness, and anger.

Create a playlist containing exactly 12 distinct songs from vpop
whose overall emotional tone and energy best match those values.

Use real, officially released songs and provide the exact song
title and primary artist. Do not invent songs or artists.

When mood values conflict, prioritize the moods with the highest
intensity. Give the playlist a short, descriptive name.
"""


async def generate_playlist_with_OpenAI(request: MoodEntryRequest) -> GeneratedPlaylist:
    input = f"""
        User mood values:
        
        - Happiness: {request.happiness}/10
        - Energy: {request.energetic}/10
        - Calmness: {request.calming}/10
        - Anxiety: {request.anxiety}/10
        - Sadness: {request.sadness}/10
        - Anger: {request.anger}/10
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
