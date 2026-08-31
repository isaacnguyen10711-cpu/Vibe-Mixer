type GenerateButtonProps = {
    onClick: () => void;
};

function GenerateButton(props: GenerateButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 w-24 items-center justify-center rounded-xl border border-violet-700 bg-violet-600 px-2 py-1 text-xs font-semibold leading-tight text-white shadow-[0_7px_0_rgb(91_33_182)] duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:w-36 md:px-4 md:text-sm lg:w-48 lg:px-7 lg:py-3 lg:text-lg"
            onClick={props.onClick}
        >
            Generate Songs
        </button>
    );
}

export default GenerateButton;
