type IsLoadingPopUpProps = {
    loading: boolean;
};

function IsLoadingPopUp(props: IsLoadingPopUpProps) {
    if (!props.loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/4 px-4">
            <div className="w-full max-w-sm rounded-xl border-2 border-violet-300 bg-rose-50 p-6 text-center shadow-xl md:max-w-md md:p-8 lg:max-w-lg lg:p-10"
            >
                <div
                    aria-hidden="true"
                    className="mx-auto flex h-10 animate-pulse items-end justify-center gap-2 md:h-12 md:gap-3 lg:h-14"
                >
                    <div className="h-5 w-2 rounded bg-violet-400 md:h-6 md:w-2.5 lg:h-7"></div>
                    <div className="h-9 w-2 rounded bg-violet-500 md:h-11 md:w-2.5 lg:h-13"></div>
                    <div className="h-7 w-2 rounded bg-pink-400 md:h-9 md:w-2.5 lg:h-11"></div>
                    <div className="h-10 w-2 rounded bg-violet-600 md:h-12 md:w-2.5 lg:h-14"></div>
                    <div className="h-6 w-2 rounded bg-pink-500 md:h-8 md:w-2.5 lg:h-10"></div>
                </div>

                <p className="mt-4 text-lg font-bold text-violet-950 md:mt-5 md:text-xl lg:text-2xl">
                    Mixing your playlist
                </p>
                <p className="mt-1 text-sm text-violet-800 md:text-base lg:text-lg">
                    Finding songs that match your mood...
                </p>
            </div>
        </div>
    );
}

export default IsLoadingPopUp;
