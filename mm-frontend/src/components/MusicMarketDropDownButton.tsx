
type MusicMarketDropDownButtonProps = {
    value: string;
    onChange: (market: string) => void;
};

function MusicMarketDropDownButton(props: MusicMarketDropDownButtonProps) {
    return (
        <div className="flex items-center gap-2">
            <select
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                className="rounded border-2 border-purple-400 bg-indigo-200 px-2 py-1 text-sm font-medium transition duration-300 ease-in-out hover:bg-indigo-300 focus:outline-2 focus:outline-blue-500 md:px-3 md:py-2 md:text-base lg:px-4 lg:py-3 lg:text-lg"
            >
                <option value="usuk" className="font-medium">US/UK</option>
                <option value="vpop" className="font-medium">V-POP</option>
                <option value="kpop" className="font-medium">K-POP</option>
            </select>
        </div>
    )
}

export default MusicMarketDropDownButton
