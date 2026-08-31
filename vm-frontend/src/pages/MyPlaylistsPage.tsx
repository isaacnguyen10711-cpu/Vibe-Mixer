import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { SavedPlaylist } from "../types/playlist";

function MyPlaylistsPage() {
    const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPlaylists() {
            try {
                const response = await fetch("http://127.0.0.1:8000/playlist/get-playlists/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });

                if (!response.ok) {
                    setError("Failed to load your saved playlists.");
                    return;
                }

                const playlistData: SavedPlaylist[] = await response.json();
                setPlaylists(playlistData);
            }
            catch {
                setError("Failed to connect to the server.");
            }
            finally {
                setLoading(false);
            }
        }

        loadPlaylists();
    }, []); 

    return (
        <main className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-12">
            <section className="mx-auto w-full max-w-5xl rounded-2xl border-2 border-violet-300 bg-white/75 p-6 shadow-lg md:p-8 lg:max-w-6xl lg:p-9">
                <Link
                    to="/profile"
                    className="text-sm font-semibold text-violet-700 underline md:text-base lg:text-lg"
                >
                    Back to profile
                </Link>

                <h1 className="mt-6 text-2xl font-bold md:text-3xl lg:text-4xl">
                    Saved playlists
                </h1>
                <p className="mt-2 text-sm text-gray-600 md:text-base lg:text-lg">
                    View the playlists you have saved.
                </p>

                {loading && (
                    <p className="mt-8 text-sm text-gray-700 md:text-base lg:text-lg">
                        Loading playlists...
                    </p>
                )}

                {error && (
                    <p className="mt-8 rounded-lg bg-red-100 p-4 text-sm text-red-700 md:text-base">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {playlists.length === 0 ? (
                            <div className="mt-8 rounded-xl bg-violet-100 p-6 text-center md:p-8">
                                <p className="text-base font-semibold md:text-lg">
                                    You have no saved playlists yet.
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 md:text-base"
                                >
                                    Generate a playlist
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                                {playlists.map((playlist) => (
                                    <>
                                    <Link
                                        to={`/my-playlist/${playlist.id}`}
                                        key={playlist.id}
                                        className="rounded-xl border-2 border-violet-200 bg-white p-4 md:p-5 lg:p-6"
                                    >
                                    <div>
                                        <h2 className="text-base font-bold text-violet-800 md:text-lg lg:text-xl">
                                            {playlist.name}
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-700 md:text-base">
                                            {playlist.description || "No description"}
                                        </p>
                                        <p className="mt-4 text-xs text-gray-500 md:text-sm">
                                            Saved {new Date(playlist.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                                </>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default MyPlaylistsPage;
