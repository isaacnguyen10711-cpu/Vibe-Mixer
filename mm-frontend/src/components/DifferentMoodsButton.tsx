import type { ActionButtonProps } from "../types/componentProps";

function DifferentMoodsButton(props: ActionButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 w-40 cursor-pointer items-center justify-center rounded-lg border-2 border-violet-500 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-[0_7px_0_rgb(91_33_182)] transition duration-300 hover:-translate-y-1 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:w-44 md:px-5 md:text-base lg:w-48 lg:text-lg"
            onClick={props.onClick}
        >
            Different Moods?
        </button>
    );
}

export default DifferentMoodsButton;
