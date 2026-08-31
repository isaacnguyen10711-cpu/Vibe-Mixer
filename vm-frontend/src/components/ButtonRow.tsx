type ButtonRowProps = {
    selectedMood: number;
    setMood: (mood: number) => void;
};

function ButtonRow( props: ButtonRowProps) {
    return (
        <>
            {[1, 2, 3, 4, 5].map((moodLevel) => {
                const isSelected = props.selectedMood === moodLevel;

                return (
                    <button
                        key={moodLevel}
                        type="button"
                        className={`flex justify-center items-center hover:cursor-pointer rounded border-2 px-3 py-1 text-sm font-medium transition duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 md:px-4 md:text-base lg:px-5 lg:text-lg ${
                            isSelected
                                ? "scale-110 border-violet-500 bg-violet-500 text-white"
                                : "border-pink-300 hover:scale-110 hover:bg-violet-300"
                        }`}
                        onClick={() => props.setMood(moodLevel)}
                    >
                        {moodLevel}
                    </button>
                );
            })}
        </>
    )
}

export default ButtonRow
