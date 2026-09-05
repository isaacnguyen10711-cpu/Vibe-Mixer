type PlayAllSongsButtonProps = {
    onClick: () => void;
};

function PlayAllSongsButton(props: PlayAllSongsButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 w-24 items-center justify-center rounded-xl border border-teal-600 bg-teal-600 px-2 py-1 text-xs font-semibold leading-tight text-white shadow-[0_7px_0_rgb(17_94_89)] duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 active:scale-95 md:w-36 md:px-4 md:text-sm lg:w-48 lg:px-7 lg:py-3 lg:text-lg"
            onClick={props.onClick}
        >
            Play All Songs
        </button>
    );
}

export default PlayAllSongsButton;
