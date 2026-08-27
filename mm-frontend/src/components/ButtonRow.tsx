type ButtonRowProps = {
  onMoodSelect: (mood: number) => void;
};

function ButtonRow( { onMoodSelect }: ButtonRowProps) {
    return (
        <>
            <button
                className="px-2 py-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => onMoodSelect(1)}
            >
                1
            </button>
            <button
                className="px-2 py-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => onMoodSelect(2)}
            >
                2
            </button>
            <button
                className="px-2 py-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => onMoodSelect (3)}
            >
                3
            </button>
            <button
                className="px-2 py-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => onMoodSelect(4)}
            >
                4
            </button>
            <button
                className="px-2 py-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => onMoodSelect(5)}
            >
                5
            </button>
        </>
    )
}

export default ButtonRow