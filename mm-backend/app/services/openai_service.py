from openai import AsyncOpenAI
from app.config import settings
from app.models.mood_entry import MoodEntryRequest
from app.models.playlist import GeneratedPlaylist

client = AsyncOpenAI(api_key=settings.OpenAI_API_KEY)

instructions = """
You are a music recommendation expert.

You will receive six mood intensity values from 1 to 10:
happiness, energy, calmness, anxiety, sadness, and anger.

You will also receive the user's selected music market.

Create a playlist containing exactly 12 distinct songs whose
emotional tone and energy best match the supplied mood values.

Every song must be real, famous, widely recognized, popular, or
known as a trending song within the selected music market.

Include a balanced mix of:
- major popular hits
- well-known classics
- popular or trending songs from recent years

Do not recommend obscure or difficult-to-find songs. Do not invent
song titles or artists. Use each song's exact official title and
primary artist name.

Follow the selected music market:
- vpop: Vietnamese pop music
- usuk: music from the United States and United Kingdom
- kpop: Korean pop music

When mood values conflict, prioritize the moods with the highest
intensity. The playlist should still feel cohesive and should
progress naturally from one song to the next.

Give the playlist:
- a short, descriptive name
- a brief description explaining how it matches the user's moods
  and selected music market
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
