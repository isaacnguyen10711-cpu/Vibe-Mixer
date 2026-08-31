type SavePlaylistButtonProps = {
    onClick: () => void;
};

function SavePlaylistButton(props: SavePlaylistButtonProps) {
    return (
        <button
            type="button"
            className="inline-flex min-h-12 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-violet-500 bg-white px-2 py-1 text-xs font-semibold leading-tight text-violet-700 shadow-[0_7px_0_rgb(91_33_182)] transition duration-300 hover:-translate-y-1 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 active:scale-95 md:w-36 md:px-4 md:text-sm lg:w-48 lg:px-5 lg:py-3 lg:text-lg"
            onClick={props.onClick}
        >
            Save Playlist
        </button>
    );
}

export default SavePlaylistButton;
