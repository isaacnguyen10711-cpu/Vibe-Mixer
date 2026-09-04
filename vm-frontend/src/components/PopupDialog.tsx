type PopupDialogProps = {
    message: string;
    confirmButtonText: string;
    onPrimaryButtonClick: () => void;
    cancelButtonText?: string;
    onSecondaryButtonClick?: () => void;
};

function PopupDialog(props: PopupDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div
                role="dialog"
                aria-modal="true"
                className="w-full max-w-sm rounded-xl border-2 border-violet-300 bg-rose-50 p-5 text-center shadow-lg md:max-w-md md:p-6 lg:max-w-lg lg:p-8"
            >
                <p className="text-base font-semibold text-violet-950 md:text-lg lg:text-xl">
                    {props.message}
                </p>

                <div className="mt-5 flex justify-center gap-3 md:mt-6 md:gap-4">
                    {props.cancelButtonText && props.onSecondaryButtonClick && (
                        <button
                            type="button"
                            onClick={props.onSecondaryButtonClick}
                            className="rounded-lg border-2 border-violet-600 bg-white px-4 py-2 text-sm font-semibold text-violet-700 hover:cursor-pointer hover:bg-violet-100 active:scale-95 md:px-5 md:text-base lg:px-6 lg:text-lg"
                        >
                            {props.cancelButtonText}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={props.onPrimaryButtonClick}
                        className="rounded-lg border-2 border-violet-700 bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-violet-700 active:scale-95 md:px-5 md:text-base lg:px-6 lg:text-lg"
                    >
                        {props.confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupDialog;
