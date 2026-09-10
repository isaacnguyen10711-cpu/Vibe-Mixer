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
        <div className="mx-auto w-full max-w-5xl md:max-w-6xl md:px-8 lg:max-w-7xl">
            <IsLoadingPopUp loading={loading} />
            {popUpMessage && (
                <PopupDialog
                    message={popUpMessage}
                    confirmButtonText="OK"
                    onConfirmButtonClick={() => setPopUpMessage(null)}
                />
            )}
            <div className="flex justify-end gap-3 px-4 pt-4 md:px-0">
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

            <section className="mx-4 mt-8 grid items-center gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-6xl">
                <div className="px-3 text-center md:px-0 md:text-left">
                    <p className="mb-3 text-sm font-semibold tracking-widest text-violet-700">
                        Vibe Mixer
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-violet-950 md:text-4xl lg:text-5xl">
                        A place to mix your vibes
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-700 md:mx-0 md:text-base">
                        Choose how you feel and create a personalised playlist made for your mood.
                    </p>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div className="w-full max-w-sm rounded-3xl bg-violet-950 p-7 text-white shadow-lg">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-full bg-white p-3 text-violet-950">
                                <AudioLines className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Your daily mix</p>
                                <p className="text-sm text-violet-200">Made from your mood</p>
                            </div>
                        </div>

                        <div className="flex h-20 items-center justify-center mt-6">
                            <AudioLines className="h-28 w-28 text-white" />
                            <AudioLines className="h-28 w-28 text-white" />
                        </div>
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
                    <div className="flex flex-wrap justify-center">
                        <h1 className="mt-2 text-2xl font-bold md:mt-5 md:text-3xl lg:text-5xl">
                            How are you feeling today?
                        </h1>
                    </div>

                    <div className="mt-4 flex justify-end px-4 md:px-0">
                        <MusicMarketDropDownButton
                            value={musicMarket}
                            onChange={setMusicMarket}
                        />
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 md:gap-20 md:space-y-[-10px] lg:gap-40 lg:space-y-[-25px] justify-center md:mt-10">
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Happy</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={happy} setMood={setHappy} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Energetic</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={energetic} setMood={setEnergetic} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Calm</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={calm} setMood={setCalm} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Sad</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={sad} setMood={setSad} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Anxious</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={anxious} setMood={setAnxious} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <h1 className="text-base font-medium md:text-xl lg:text-2xl">Angry</h1>
                            </div>
                            <div className="grid grid-cols-5 mt-2 gap-4 md:gap-6 md:mt-3 lg:gap-8 lg:mt-4">
                                <ButtonRow selectedMood={angry} setMood={setAngry} />
                            </div>
                        </div>
                    </div>
                    <div className="my-6 flex justify-center px-4 md:justify-end md:px-0 md:mt-10 lg:mt-12">
                        <GenerateButton onClick={handleGenerateSongs} />
                    </div>
                </>
            )}
        </div>

    )
}

export default HomePage
