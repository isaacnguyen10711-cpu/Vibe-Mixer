type GenerateButtonProps = {
    onClick: () => void;
};

function GenerateButton(props: GenerateButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition duration-300 hover:cursor-pointer hover:scale-105 hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:px-8 md:text-base lg:text-lg"
            onClick={props.onClick}
        >
            Generate Songs
        </button>
    );
}

export default GenerateButton;
