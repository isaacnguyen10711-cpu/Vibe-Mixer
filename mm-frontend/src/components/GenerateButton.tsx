
import type { GenerateButtonProps } from "../types/componentProps";

function GenerateButton(props: GenerateButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 w-40 items-center justify-center rounded-xl border border-violet-700 bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_7px_0_rgb(91_33_182)] duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:w-44 md:px-6 md:py-3 md:text-base lg:w-48 lg:px-7 lg:py-3 lg:text-lg"
            onClick={props.onClick}
        >
            Generate Songs
        </button>
    )
}

export default GenerateButton
