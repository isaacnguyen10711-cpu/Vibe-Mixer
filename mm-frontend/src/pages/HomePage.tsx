import { useState } from 'react'
import ButtonRow from '../components/ButtonRow';

function HomePage() {
    const [happy, setHappy] = useState(1);
    const [energetic, setEnergetic] = useState(1);
    const [calm, setCalm] = useState(1);
    const [sad, setSad] = useState(1);
    const [anxious, setAnxious] = useState(1);
    const [angry, setAngry] = useState(1);

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
                        <ButtonRow selectedMood={happy} onMoodSelect={setHappy} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Energetic</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={energetic} onMoodSelect={setEnergetic} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Calm</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={calm} onMoodSelect={setCalm} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Sad</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={sad} onMoodSelect={setSad} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Anxious</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={anxious} onMoodSelect={setAnxious} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-base font-medium md:text-xl lg:text-2xl">Angry</h1>
                    </div>
                    <div className="grid grid-cols-5 mt-2 gap-2 md:gap-4 md:mt-3 lg:gap-8 lg:mt-4">
                        <ButtonRow selectedMood={angry} onMoodSelect={setAngry} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage
