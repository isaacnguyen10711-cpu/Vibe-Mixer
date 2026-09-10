import { useState, useEffect } from 'react'
import ButtonRow from '../components/ButtonRow';
import DifferentMoodsButton from '../components/DifferentMoodsButton';
import GenerateButton from '../components/GenerateButton';
import GeneratedPlaylist from '../components/GeneratedPlaylist';
import MusicMarketDropDownButton from '../components/MusicMarketDropDownButton';
import SavePlaylistButton from '../components/SavePlaylistButton';
import IsLoadingPopUp from '../components/IsLoadingPopUp';
import PopupDialog from '../components/PopupDialog';
import type { GeneratedPlaylistData } from '../types/playlist';
import { Link } from 'react-router';
import { User } from 'lucide-react';
import PlayAllVideosButton from '../components/PlayAllSongsButton';
import { API_URL } from '../config';
import { AudioLines } from 'lucide-react';


function HomePage() {
    const [happy, setHappy] = useState(1);
    const [energetic, setEnergetic] = useState(1);
    const [calm, setCalm] = useState(1);
    const [sad, setSad] = useState(1);
    const [anxious, setAnxious] = useState(1);
    const [angry, setAngry] = useState(1);
    const [musicMarket, setMusicMarket] = useState("usuk");

    const [loading, setLoading] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [playlist, setPlaylist] = useState<GeneratedPlaylistData | null>(() => {
        // Initialize the playlist state from session storage if available and return to playlist state
        const savedPlaylist = sessionStorage.getItem('playlist');
        return savedPlaylist ? JSON.parse(savedPlaylist) : null;
    });

    const [isPlayingAllVideos, setIsPlayingAllVideos] = useState(false);

    // Check if the user is logged in by verifying the access token through the backend API
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const checkToken = async () => {
            if (!token) {
                return;
            }

            const response = await fetch(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem("access_token");
                setIsLoggedIn(false);
            }
        }

        checkToken();
    }, []);


    useEffect(() => {
        // Update session storage whenever the playlist state changes
        if (playlist) {
            sessionStorage.setItem('playlist', JSON.stringify(playlist));
        }
        else {
            sessionStorage.removeItem('playlist');
        }
    }, [playlist]);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    const handleGenerateSongs = async () => {
        setLoading(true);

        // Set the response URL and headers based on the user's login status
        const responseUrl = isLoggedIn ? `${API_URL}/playlist/generate-personalised-playlist` : `${API_URL}/playlist/generate-playlist`;
        // Initialize headers with Content-Type and add Authorization if the user is logged in
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }
        if (isLoggedIn) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        }

        try {
            const response = await fetch(responseUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ happy, energetic, calm, sad, anxious, angry, music_market: musicMarket }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate playlist");
            }

            const data: GeneratedPlaylistData = await response.json();
            setPlaylist(data);
            console.log('Response data:', data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePlaylist = async () => {
        try {
            const response = await fetch(`${API_URL}/playlist/save-playlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(playlist),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized. Please log in to your account to save the playlist.");
                }
                else {
                    throw new Error("Failed to save playlist");
                }
            }

            const data = await response.json();
            setPopUpMessage("Playlist saved successfully!");
            console.log('Saved playlist:', data);
        }
        catch (error) {
            if (error instanceof Error) {
                setPopUpMessage(error.message);
            }
            else {
                console.error(error);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl pb-10 md:px-8">
            <IsLoadingPopUp loading={loading} />
            {popUpMessage && (
                <PopupDialog
                    message={popUpMessage}
                    confirmButtonText="OK"
                    onConfirmButtonClick={() => setPopUpMessage(null)}
                />
            )}
            <header className="flex items-center justify-between px-4 py-5 md:px-0">
                <div className="flex items-center gap-2 text-violet-950">
                    <AudioLines className="h-7 w-7" />
                    <span className="text-xl font-bold">Vibe Mixer</span>
                </div>

                <div className="flex gap-3">
                {!isLoggedIn ? (
                    <Link
                        to="/login"
                        className="rounded-lg border-2 border-violet-500 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 md:text-base lg:px-5 lg:text-lg"
                    >
                        Log in
                    </Link>
                ) : (
                    <Link
                        to="/"
                        onClick={handleLogout}
                        className="rounded-lg border-2 border-violet-500 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 md:text-base lg:px-5 lg:text-lg"
                    >
                        Log out
                    </Link>
                )}
                {isLoggedIn && (
                    <Link
                        to="/profile"
                        aria-label="Open profile"
                        title="Profile"
                        className="flex items-center justify-center rounded-lg border-2 border-violet-500 bg-white px-3 py-2 text-violet-700 transition hover:bg-violet-100 md:px-4 lg:px-5"
                    >
                        <User className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                    </Link>
                )}
                </div>
            </header>

            <section className="mx-4 grid min-h-screen content-start items-center gap-12 pt-12 md:grid-cols-2 lg:mx-auto lg:max-w-6xl">
                <div className="text-center md:text-left">
                    <p className="mb-4 text-sm font-semibold tracking-wider text-violet-700 md:text-base">
                        Music made for your mood
                    </p>
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-violet-950 md:text-6xl lg:text-7xl">
                        A place to mix your <span className="text-violet-700">vibes.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate-700 md:mx-0 md:text-lg">
                        Choose how you feel and create a personalised playlist made for your mood.
                    </p>

                    <p className="mt-6 font-semibold text-violet-950">
                        6 moods · 3 music markets · 12 songs
                    </p>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div className="flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-3xl border border-white/20 bg-violet-950 p-8 text-center text-white shadow-xl shadow-violet-900/20">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-violet-300 bg-white text-violet-950 md:h-48 md:w-48">
                            <AudioLines className="h-20 w-20 md:h-24 md:w-24" />
                        </div>
                        <p className="mt-8 text-2xl font-semibold">Your personalised mix</p>
                        <p className="mt-2 text-sm text-violet-200 md:text-base">Built around how you feel today</p>
                    </div>
                </div>
            </section>
            {playlist ? (
                <>
                    <GeneratedPlaylist
                        playlist={playlist}
                        isPlayingAllVideos={isPlayingAllVideos}
                        onCloseAllVideos={() => setIsPlayingAllVideos(false)}
                    />
                    <div className="mx-2 mb-4 grid grid-cols-2 gap-3 md:mx-0 md:flex md:justify-between lg:mt-4">
                        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-start md:gap-4 lg:gap-6">
                            <DifferentMoodsButton onClick={() => setPlaylist(null)} />
                            <GenerateButton onClick={handleGenerateSongs} />
                        </div>
                        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-end md:gap-4 lg:gap-6">
                            <SavePlaylistButton onClick={handleSavePlaylist} />
                            <PlayAllVideosButton onClick={() => setIsPlayingAllVideos(true)} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mx-4 mt-4 grid overflow-hidden rounded-2xl border border-violet-300 bg-white/80 shadow-lg shadow-violet-900/10 md:mx-0 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-between gap-4 border-b border-violet-300 bg-white/60 p-5 md:col-span-3 md:flex-row md:px-7">
                            <h2 className="text-2xl font-bold text-violet-950 md:text-3xl">
                                How are you feeling today?
                            </h2>

                            <MusicMarketDropDownButton
                                value={musicMarket}
                                onChange={setMusicMarket}
                            />
                        </div>

                        <div className="border-b border-violet-300 p-5 md:border-r">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Happy</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={happy} setMood={setHappy} />
                            </div>
                        </div>
                        <div className="border-b border-violet-300 p-5 md:border-r">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Energetic</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={energetic} setMood={setEnergetic} />
                            </div>
                        </div>
                        <div className="border-b border-violet-300 p-5">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Calm</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={calm} setMood={setCalm} />
                            </div>
                        </div>
                        <div className="border-b border-violet-300 p-5 md:border-b-0 md:border-r">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Sad</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={sad} setMood={setSad} />
                            </div>
                        </div>
                        <div className="border-b border-violet-300 p-5 md:border-b-0 md:border-r">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Anxious</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={anxious} setMood={setAnxious} />
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Angry</h3>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={angry} setMood={setAngry} />
                            </div>
                        </div>
                    </div>
                    <div className="my-7 flex justify-center px-4 md:justify-end md:px-0">
                        <GenerateButton onClick={handleGenerateSongs} />
                    </div>
                </>
            )}
        </div>

    )
}

export default HomePage
