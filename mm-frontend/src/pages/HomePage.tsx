import { useState } from 'react'
import ButtonRow from '../components/ButtonRow';
import GenerateButton from '../components/GenerateButton';

function HomePage() {
    const [happy, setHappy] = useState(1);
    const [energetic, setEnergetic] = useState(1);
    const [calm, setCalm] = useState(1);
    const [sad, setSad] = useState(1);
    const [anxious, setAnxious] = useState(1);
    const [angry, setAngry] = useState(1);
    const [musicMarket, setMusicMarket] = useState("");


    const [playListTitle, setPlayListTitle] = useState("");
    const [playListDescription, setPlayListDescription] = useState("");
    const [generatedSongs, setGeneratedSongs] = useState([]);
    

    const handleGenerateSongs = async() => {
        const response = await fetch('http://127.0.0.1:8000/playlist/generate-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ happy, energetic, calm, sad, anxious, angry }),
        });

        const data = await response.json();
        setGeneratedSongs(data.songs);
        console.log('Response data:', data);

        console.log('Generating songs with moods:', { happy, energetic, calm, sad, anxious, angry });
    };

    return (
        <div className="max-w-6xl md:max-w-7xl mx-auto max-h-screen md:px-8">
            <div className="flex justify-center">
                <h1 className="text-lg mt-10 italic underline font-medium md:text-xl md:mt-15 lg:text-2xl">Mood Mixer</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                <h1 className="text-2xl mt-2 font-bold md:text-3xl md:mt-5 lg:text-5xl ">How are you feeling today?</h1>
            </div>

            <div className="grid gap-3 my-5 md:grid-cols-3 md:gap-20 lg:gap-40 justify-center md:mt-15">
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Happy</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={happy} setMood={setHappy} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Energetic</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={energetic} setMood={setEnergetic} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Calm</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={calm} setMood={setCalm} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Sad</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={sad} setMood={setSad} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Anxious</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={anxious} setMood={setAnxious} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Angry</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={angry} setMood={setAngry} />
                    </div>
                </div>
            </div>
            <div className="my-6 flex justify-center px-4 md:justify-end md:px-0">
                <GenerateButton onClick={handleGenerateSongs} />
            </div>
        </div>

    )
}

export default HomePage
