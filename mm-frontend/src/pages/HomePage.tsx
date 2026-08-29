import { useState, useEffect } from 'react'
import ButtonRow from '../components/ButtonRow';
import GenerateButton from '../components/GenerateButton';
import GeneratedPlaylist from '../components/GeneratedPlaylist';
import MusicMarketDropDownButton from '../components/MusicMarketDropDownButton';
import IsLoadingPopUp from '../components/IsLoadingPopUp';
import type { GeneratedPlaylistData } from '../types/playlist';
import { Link } from 'react-router';


function HomePage() {
    const [happy, setHappy] = useState(1);
    const [energetic, setEnergetic] = useState(1);
    const [calm, setCalm] = useState(1);
    const [sad, setSad] = useState(1);
    const [anxious, setAnxious] = useState(1);
    const [angry, setAngry] = useState(1);
    const [musicMarket, setMusicMarket] = useState("usuk");

    const [playlist, setPlaylist] = useState<GeneratedPlaylistData | null>(null);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        const loggedIn = localStorage.getItem('access_token')
        if (loggedIn) {
            setIsLoggedIn(true);
        } 
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    const handleGenerateSongs = async() => {
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

    return (
        <div className="mx-auto w-full max-w-5xl md:max-w-6xl md:px-8 lg:max-w-7xl">
            <IsLoadingPopUp loading={loading} />
            <div className="flex justify-end px-4 pt-4 md:px-0">
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
            </div>
            <div className="flex justify-center mt-[-16px] md:mt-0">
                <h1 className="text-lg italic underline font-medium md:text-xl lg:text-2xl">Mood Mixer</h1>
            </div>
            {playlist ? (
                <>
                    <GeneratedPlaylist playlist={playlist} />
                    <div className="mb-4 flex gap-4 justify-center md:justify-end md:gap-6">
                        <button
                            type="button"
                            className="inline-flex min-h-12 w-40 cursor-pointer items-center justify-center rounded-lg border-2 border-violet-500 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition duration-300 shadow-[0_7px_0_rgb(91_33_182)] hover:bg-violet-100 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:w-44 md:px-5 md:text-base lg:w-48 lg:text-lg"
                            onClick={() => setPlaylist(null)}
                        >
                            Try Again
                        </button>
                        <GenerateButton
                            onClick={handleGenerateSongs}
                        />
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

                    <div className="grid gap-3 md:grid-cols-3 md:gap-20 lg:gap-40 justify-center md:mt-10">
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
                    <div className="my-6 flex justify-center px-4 md:justify-end md:px-0">
                        <GenerateButton onClick={handleGenerateSongs} />
                    </div>
                </>
            )}
        </div>

    )
}

export default HomePage
