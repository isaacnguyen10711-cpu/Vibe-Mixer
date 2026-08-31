# Vibe Mixer

Vibe Mixer is a full-stack web application that generates music playlists based on the user's mood and preferred music market.

## Features

- Generate playlists from six mood values
- Choose between US/UK, V-Pop, and K-Pop
- Receive structured music recommendations from OpenAI
- Find matching YouTube videos and metadata
- Register and log in using JWT authentication
- Update profile information
- Save generated playlists
- View previously saved playlists
- Responsive mobile, tablet, and desktop interface

## Screenshots

### Mood selection

![Vibe Mixer home page](mm-frontend/src/assets/demo/HomePage.png)

### Loading state

![Playlist loading state](mm-frontend/src/assets/demo/Loading.png)

### Generated playlist

![Generated playlist](mm-frontend/src/assets/demo/GeneratedPlaylist.png)

### Authentication

![Login page](mm-frontend/src/assets/demo/LoginPage.png)

![Register page](mm-frontend/src/assets/demo/RegisterPage.png)

### Profile

![Profile page](mm-frontend/src/assets/demo/ProfilePage.png)

### Saved playlists

![Saved playlists page](mm-frontend/src/assets/demo/SavedPlaylistPage.png)


## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Backend

- FastAPI
- Python
- SQLModel
- PostgreSQL
- Alembic
- JWT authentication

### External APIs

- OpenAI API
- YouTube Data API v3

## Project Structure

```text
Vibe-Mixer/
├── vm-frontend/     # React frontend
├── vm-backend/      # FastAPI backend
└── README.md
```
