import GeneratedPlaylist from '../components/GeneratedPlaylist';
import { Link, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { GeneratedPlaylistData } from '../types/playlist';
import PopupDialog from '../components/PopupDialog';
import { API_URL } from '../config';
import { AudioLines } from 'lucide-react';
import PlayAllSongsButton from '../components/PlayAllSongsButton';

function PlaylistDetailsPage() {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<GeneratedPlaylistData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [isPlayingAllSongs, setIsPlayingAllSongs] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");

    useEffect(() => {
        // Fetch playlist songs based on the playlistId
        async function fetchPlaylistSongs() {
            try {
                const response = await fetch(`${API_URL}/playlist-songs/get-songs/${playlistId}`,
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
                setName(data.name);
                setDescription(data.description ?? "");
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

    async function handleSave() {
        if (!playlistId || !playlist || !name.trim()) {
            setError("Playlist name cannot be empty.");
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL}/playlist/update-playlist/${playlistId}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        description: description.trim(),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update playlist.");
            }

            setPlaylist({
                ...playlist,
                name: name.trim(),
                description: description.trim(),
            });
            setIsEditing(false);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Failed to update playlist.");
        }
        finally {
            setIsSaving(false);
        }
    }

    function handleCancel() {
        setName(playlist?.name ?? "");
        setDescription(playlist?.description ?? "");
        setError(null);
        setIsEditing(false);
    }

    function openDeletePopup() {
        setPopUpMessage("Are you sure you want to delete this playlist?");
        setIsDeletePopUpOpen(true);
    }

    async function handleDelete() {
        if (!playlistId) return;

        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL}/playlist/delete-playlist/${playlistId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete playlist.");
            }

            navigate("/my-playlists");
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Failed to delete playlist.");
            setIsDeleting(false);
        }
        finally {
            setIsDeletePopUpOpen(false);
        }
    }

    return (
        <>
            {/* Delete confirmation popup */}
            {isDeletePopUpOpen && (
                <PopupDialog
                    message={popUpMessage}
                    confirmButtonText="Delete"
                    onConfirmButtonClick={handleDelete}
                    cancelButtonText="Cancel"
                    onCancelButtonClick={() => setIsDeletePopUpOpen(false)}
                />
            )}

            <main className="max-w-5xl lg:max-w-7xl mx-auto p-2 md:p-6">
                {/* Page logo and navigation */}
                <div className="flex justify-center mt-4 md:mt-8">
                    <Link to="/" className="flex items-center gap-2 text-violet-950">
                        <AudioLines className="h-7 w-7" />
                        <span className="text-xl font-bold">Vibe Mixer</span>
                    </Link>
                </div>
                <Link
                    to="/my-playlists"
                    className="inline-block text-sm font-semibold text-violet-700 underline p-2 md:text-base lg:text-lg lg:mb-[-10px]"
                >
                    Back to My Playlists
                </Link>

                {/* Loading error */}
                {error && <p className="mt-2 text-sm text-red-600 md:text-base">{error}</p>}

                {/* Playlist details */}
                {playlist && (
                    <>
                        {/* Playlist editing form */}
                        {isEditing && (
                            <div className="mx-3 mt-4 rounded-xl border-2 border-violet-400 bg-violet-100 p-3 md:mx-0 md:p-4 lg:p-5">
                                <label className="block text-sm font-semibold text-violet-700 md:text-base lg:text-lg">
                                    Playlist name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="mt-1 w-full rounded-lg border-2 border-violet-200 px-3 py-2 text-sm outline-none focus:border-violet-600 md:text-base lg:text-lg"
                                />

                                <label className="mt-3 block text-sm font-semibold text-violet-700 md:text-base lg:text-lg">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    rows={3}
                                    className="mt-1 w-full resize-none rounded-lg border-2 border-violet-200 px-3 py-2 text-sm outline-none focus:border-violet-600 md:text-base lg:text-lg"
                                />
                            </div>
                        )}

                        <GeneratedPlaylist
                            playlist={playlist}
                            isPlayingAllVideos={isPlayingAllSongs}
                            onCloseAllVideos={() => setIsPlayingAllSongs(false)} />

                        {/* Edit and delete actions */}
                        <div className="mx-3 my-4 grid grid-cols-2 gap-3 md:mx-0 md:my-5 lg:my-6">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="rounded-lg border-2 border-violet-600 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-violet-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50 md:px-5 md:text-base lg:px-6 lg:text-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="rounded-lg border-2 border-violet-700 bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-violet-700 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50 md:px-5 md:text-base lg:px-6 lg:text-lg"
                                    >
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                </>
                            ) : (
                                <>
                                <div className="flex justify-start gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex min-h-12 w-32 items-center justify-center rounded-lg border-2 border-violet-600 bg-white px-2 py-2 text-sm font-semibold leading-tight text-violet-700 transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-violet-100 active:scale-95 md:w-38 md:text-base lg:w-48 lg:py-3 lg:text-lg"
                                    >
                                        Edit Playlist
                                    </button>
                                    <button
                                        type="button"
                                        onClick={openDeletePopup}
                                        disabled={isDeleting}
                                        className="inline-flex min-h-12 w-32 items-center justify-center rounded-lg bg-red-600 px-2 py-2 text-sm font-semibold leading-tight text-white transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50 md:w-38 md:text-base lg:w-48 lg:py-3 lg:text-lg"
                                    >
                                        {isDeleting ? "Deleting..." : "Delete Playlist"}
                                    </button>
                                </div>
                                    <div className="flex justify-end">
                                        <PlayAllSongsButton
                                            onClick={() => setIsPlayingAllSongs(true)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </main>
        </>
    );
}

export default PlaylistDetailsPage;
