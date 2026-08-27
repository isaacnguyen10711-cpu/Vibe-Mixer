import { useState } from 'react'
import ButtonRow from '../components/ButtonRow';
import GenerateButton from '../components/GenerateButton';
import GeneratedPlaylist from '../components/GeneratedPlaylist';
import MusicMarketDropDownButton from '../components/MusicMarketDropDownButton';
import IsLoadingPopUp from '../components/IsLoadingPopUp';
import type { GeneratedPlaylistData } from '../types/playlist';


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
        <div className="max-w-6xl md:max-w-7xl mx-auto max-h-screen md:px-8">
            <IsLoadingPopUp loading={loading} />
            <div className="flex justify-center">
                <h1 className="text-lg mt-7 italic underline font-medium md:text-xl md:mt-15 lg:text-2xl">Mood Mixer</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                <h1 className="text-2xl mt-2 font-bold md:text-3xl md:mt-5 lg:text-5xl ">How are you feeling today?</h1>
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


            {playlist && (
                <GeneratedPlaylist playlist={playlist} />
            )}
        </div>

    )
}

export default HomePage
