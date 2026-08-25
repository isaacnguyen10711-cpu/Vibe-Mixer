from googleapiclient.discovery import build
from app.config import settings
import isodate

#Initialize the YouTube Data API client
service = build('youtube', 'v3', developerKey=settings.YouTube_API_Key)

#This api call searches for a video on YouTube based on a search query.
def search_youtube_video(search_query: str):
    #service.search().list() is used to get the videoId, title, description and thumbnail_url of the first video that matches the search query.
    video_request = service.search().list(
        part='snippet',
        q=search_query, 
        type='video',
        maxResults=1,
        embeddable='true',
        key=settings.YouTube_API_Key
    )

    response = video_request.execute()
    video_id = response['items'][0]['id']['videoId']
    title = response['items'][0]['snippet']['title']
    description = response['items'][0]['snippet']['description']
    thumbnail_url = response['items'][0]['snippet']['thumbnails']['default']['url']


    #service.videos().list() is used to get the duration of the video in ISO 8601 format.
    video_details_request = service.videos().list(
        part='contentDetails',
        id=video_id,
        key=settings.YouTube_API_Key
    )

    video_details_response = video_details_request.execute()
    duration = video_details_response['items'][0]['contentDetails']['duration']
     # Convert ISO 8601 duration to seconds
    duration = int(isodate.parse_duration(duration).total_seconds())

    return {
        'video_id': video_id,
        'title': title,
        'description': description,
        'thumbnail_url': thumbnail_url,
        'duration': duration
    }


