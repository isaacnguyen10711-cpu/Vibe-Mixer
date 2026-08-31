import GeneratedPlaylist from '../components/GeneratedPlaylist';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { GeneratedPlaylistData } from '../types/playlist';

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<GeneratedPlaylistData | null>(null);

    useEffect(() => {
        // Fetch playlist songs based on the playlistId
        async function fetchPlaylistSongs() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/playlist-songs/get-songs/${playlistId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }
                );

                if (!response.ok) { 
                    if (response.status === 401) {
                        throw new Error('Unauthorized. Please log in.');
                    }
                    else if (response.status === 404) {
                        throw new Error('Playlist not found.');
                    }
                    else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }
                const data = await response.json();
                setPlaylist(data);
            } 
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching playlist songs:', error.message);
                } 
                else {
                    console.error('Error fetching playlist songs:', error);
                }
            }
        }
        
        if (playlistId) {
            fetchPlaylistSongs();
        }
    }, [playlistId]);

    return (
        <main>
            {playlist && (
                <GeneratedPlaylist playlist={playlist} />
            )}
        </main>
    );
}

export default PlaylistDetailsPage;