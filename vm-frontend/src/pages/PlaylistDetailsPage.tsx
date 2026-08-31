import GeneratedPlaylist from '../components/GeneratedPlaylist';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { GeneratedPlaylistData } from '../types/playlist';

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<GeneratedPlaylistData | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                    setError(error.message);
                }
                else {
                    setError('An unknown error occurred while fetching playlist songs.');
                }
            }
        }

        if (playlistId) {
            fetchPlaylistSongs();
        }
    }, [playlistId]);

    return (
        <main className="max-w-5xl lg:max-w-7xl mx-auto p-2 md:p-6">
            <div className="flex justify-center mt-4 md:mt-8">
                <Link to="/">
                <h1 className="text-xl italic underline font-medium md:text-2xl">Vibe Mixer</h1>
                </Link>
            </div>
            <Link
                to="/my-playlists"
                className="inline-block text-sm font-semibold text-violet-700 underline p-2 md:text-base lg:text-lg lg:mb-[-10px]"
            >
                Back to My Playlists
            </Link>

            {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
            )}

            {!error && playlist && (
                <GeneratedPlaylist playlist={playlist} />
            )}
        </main>
    );
}

export default PlaylistDetailsPage;