
function IsLoadingPopUp(props: {loading: boolean}) {
    if (!props.loading) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="text-medium p-4 rounded-lg shadow h-20 w-40 flex items-center justify-center bg-rose-100">
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default IsLoadingPopUp;