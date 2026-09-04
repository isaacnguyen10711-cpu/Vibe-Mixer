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
import { jwtDecode } from 'jwt-decode';  


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

    const token = localStorage.getItem('access_token'); 

    
    useEffect(() => {
        // Check if the user is logged in based on the token's expiration time
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
                setIsLoggedIn(true);
            }
            else {
                localStorage.removeItem('access_token');
                setIsLoggedIn(false);
            }
        }

        // Update session storage whenever the playlist state changes
        if (playlist) {
            sessionStorage.setItem('playlist', JSON.stringify(playlist));
        }
        else {
            sessionStorage.removeItem('playlist');
        }
    }, [playlist, token]);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    const handleGenerateSongs = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/playlist/generate-playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ happy, energetic, calm, sad, anxious, angry, music_market: musicMarket }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate playlist");
            }

            const data: GeneratedPlaylistData = await response.json();
            setPlaylist(data);
            console.log('Response data:', data);
            console.log('Generating songs with moods:', { happy, energetic, calm, sad, anxious, angry });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePlaylist = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/playlist/save-playlist', {
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
                    onPrimaryButtonClick={() => setPopUpMessage(null)}
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
            <div className="flex justify-center mt-[-16px] md:mt-0">
                <h1 className="text-lg italic underline font-medium md:text-xl lg:text-2xl">Vibe Mixer</h1>
            </div>
            {playlist ? (
                <>
                    <GeneratedPlaylist playlist={playlist} />
                    <div className="mx-2 mb-4 flex justify-center gap-2 md:mx-0 md:justify-end md:gap-4 lg:mt-4 lg:gap-6">
                        <DifferentMoodsButton onClick={() => setPlaylist(null)} />
                        <GenerateButton onClick={handleGenerateSongs} />
                        <SavePlaylistButton onClick={handleSavePlaylist} />
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
