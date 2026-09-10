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
            {/* Loading and popup messages */}
            <IsLoadingPopUp loading={loading} />
            {popUpMessage && (
                <PopupDialog
                    message={popUpMessage}
                    confirmButtonText="OK"
                    onConfirmButtonClick={() => setPopUpMessage(null)}
                />
            )}

            {/* Header and account navigation */}
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

            {/* Hero section */}
            <section className="mx-4 grid min-h-screen content-start items-center gap-12 pt-12 md:max-h-screen md:grid-cols-2 md:gap-8 md:pt-8 lg:mx-auto lg:min-h-screen lg:max-w-6xl lg:gap-12 lg:pt-12">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-semibold leading-tight tracking-tight transition duration-500 hover:-translate-y-1 text-violet-950 md:text-6xl lg:text-7xl">
                        Whatever the mood, there’s a mix for it.
                    </h1>

                    <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-violet-900 md:mx-0 md:text-lg">
                        Tell us how today feels. Vibe Mixer will find 12 songs that fit the moment.
                    </p>
                    <button
                        type="button"
                        className="mt-6 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-xl transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-teal-700 md:mt-8 md:px-6 md:py-3"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        Select Mood 
                    </button>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div className="flex min-h-[24rem] w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/20 bg-violet-950 p-6 text-center text-white shadow-xl shadow-violet-900/20 transition duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:min-h-[26rem] md:max-w-md md:p-8 lg:min-h-[34rem] lg:max-w-lg lg:p-10">
                        <div className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-violet-300 bg-white text-violet-950 transition duration-500 hover:scale-105 md:h-48 md:w-48 lg:h-56 lg:w-56">
                            <AudioLines className="h-16 w-16 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                        </div>
                        <p className="mt-6 text-2xl font-semibold md:mt-8 md:text-3xl lg:mt-10">Today’s mix</p>
                        <p className="mt-2 text-sm text-violet-200 md:mt-3 md:text-base lg:text-lg">12 songs picked for this mood.</p>
                    </div>
                </div>
                <p className="text-center text-sm font-medium text-violet-700 md:col-span-2">
                    Choose your mood below ↓
                </p>
            </section>
            
            {/* Generated playlist or mood selection form */}
            {playlist ? (
                <>
                    {/* Generated playlist results */}
                    <GeneratedPlaylist
                        playlist={playlist}
                        isPlayingAllVideos={isPlayingAllVideos}
                        onCloseAllVideos={() => setIsPlayingAllVideos(false)}
                    />

                    {/* Playlist action buttons */}
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
                    {/* Mood levels and music market */}
                    <div className="mx-4 grid gap-8 rounded-2xl border border-violet-300 bg-white/80 p-6 shadow-lg shadow-violet-900/10 md:mx-0 md:grid-cols-2 md:p-8 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-between gap-4 border-b border-violet-200 pb-6 md:col-span-2 md:flex-row lg:col-span-3">
                            <h2 className="text-2xl font-bold text-violet-950 md:text-3xl">
                                How are you feeling today?
                            </h2>

                            <MusicMarketDropDownButton
                                value={musicMarket}
                                onChange={setMusicMarket}
                            />
                        </div>

                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Happy</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={happy} setMood={setHappy} />
                            </div>
                        </div>
                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Energetic</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={energetic} setMood={setEnergetic} />
                            </div>
                        </div>
                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Calm</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={calm} setMood={setCalm} />
                            </div>
                        </div>
                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Sad</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={sad} setMood={setSad} />
                            </div>
                        </div>
                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Anxious</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={anxious} setMood={setAnxious} />
                            </div>
                        </div>
                        <div className="border-l-4 border-violet-400 pl-4">
                            <div className="flex justify-center">
                                <h3 className="text-base font-semibold text-violet-950 md:text-xl">Angry</h3>
                            </div>
                            <div className="mt-2 grid grid-cols-5 gap-2 md:mt-3 md:gap-3 lg:mt-4 lg:gap-4">
                                <ButtonRow selectedMood={angry} setMood={setAngry} />
                            </div>
                        </div>
                    </div>

                    {/* Generate playlist button */}
                    <div className="my-7 flex justify-center px-4 md:justify-end md:px-0">
                        <GenerateButton onClick={handleGenerateSongs} />
                    </div>
                </>
            )}
        </div>

    )
}

export default HomePage
