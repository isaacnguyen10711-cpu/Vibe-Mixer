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
                        className={`flex items-center justify-center rounded-lg border px-4 py-3 text-base font-semibold transition duration-200 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 md:px-5 md:text-lg ${
                            isSelected
                                ? "border-violet-700 bg-violet-700 text-white"
                                : "border-violet-200 bg-white text-violet-900 hover:border-violet-400 hover:bg-violet-100"
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
