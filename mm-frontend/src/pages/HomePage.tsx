import { useState, useEffect } from 'react'

function HomePage() {
    const [mood, setMood] = useState(1);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-center">
                <h1 className="text-lg mt-20 italic underline font-medium md:text-xl lg:text-2xl">Mood Mixer</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl mt-5 font-bold md:text-3xl lg:text-5xl">How are you feeling today?</h1>
            </div>

            <div className="flex justify-center mt-10">
                <h1 className="text-lg font-medium md:text-xl lg:text-2xl">Happy</h1>
            </div>
            <div className="grid grid-cols-5 gap-4 md:grid-cols-10 justify-center mt-5">
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(1)}
                >
                    1
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(2)}
                >
                    2
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(3)}
                >
                    3
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(4)}
                >
                    4
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(5)}
                >
                    5
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(6)}
                >
                    6
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(7)}
                >
                    7
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(8)}
                >
                    8
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(9)}
                >
                    9
                </button>
                <button
                    className="px-4 py-2 mx-2 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-500 ease-in-out hover:scale-110"
                    onClick={() => setMood(10)}
                >
                    10
                </button>
            </div>

        </div>
    )
}

export default HomePage
