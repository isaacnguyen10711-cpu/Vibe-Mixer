import { useState, useEffect } from 'react'
import ButtonRow from '../components/ButtonRow';

function HomePage() {
    const [happy, setHappy] = useState(1);
    const [energetic, setEnergetic] = useState(1);
    const [calm, setCalm] = useState(1);
    const [sad, setSad] = useState(1);
    const [anxious, setAnxious] = useState(1);
    const [angry, setAngry] = useState(1);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-center">
                <h1 className="text-lg mt-20 italic underline font-medium md:text-xl lg:text-2xl">Mood Mixer</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl mt-5 font-bold md:text-3xl lg:text-5xl">How are you feeling today?</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-20 justify-center mt-10">
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Happy</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setHappy} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Energetic</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setEnergetic} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Calm</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setCalm} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Sad</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setSad} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Anxious</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setAnxious} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Angry</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-2 justify-center mt-3">
                        <ButtonRow onMoodSelect={setAngry} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage
