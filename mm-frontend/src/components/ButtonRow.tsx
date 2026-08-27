type ButtonRowProps = {
  onMoodSelect: (mood: number) => void;
};

function ButtonRow( props: ButtonRowProps) {
    return (
        <>
            <button
                className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mx-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => props.onMoodSelect(1)}
            >
                1
            </button>
            <button
                className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mx-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => props.onMoodSelect(2)}
            >
                2
            </button>
            <button
                className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mx-1  rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => props.onMoodSelect(3)}
            >
                3
            </button>
            <button
                className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mx-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => props.onMoodSelect(4)}
            >
                4
            </button>
            <button
                className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 mx-1 rounded hover:bg-violet-300 outline outline-2 outline-pink-300 transition duration-300 ease-in-out hover:scale-110"
                onClick={() => props.onMoodSelect(5)}
            >
                5
            </button>
        </>
    )
}

export default ButtonRow