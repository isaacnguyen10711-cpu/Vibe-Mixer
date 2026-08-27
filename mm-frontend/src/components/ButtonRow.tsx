import type { ButtonRowProps } from "../types/componentProps";

function ButtonRow( props: ButtonRowProps) {
    return (
        <>
            {[1, 2, 3, 4, 5].map((moodLevel) => {
                const isSelected = props.selectedMood === moodLevel;

                return (
                    <button
                        key={moodLevel}
                        type="button"
                        className={`flex justify-center items-center rounded border-2 px-3 py-1 text-sm font-medium transition duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-95 md:px-4 md:py-2 md:text-base lg:px-5 lg:text-lg ${
                            isSelected
                                ? "scale-110 border-violet-400 bg-violet-400 text-white"
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
