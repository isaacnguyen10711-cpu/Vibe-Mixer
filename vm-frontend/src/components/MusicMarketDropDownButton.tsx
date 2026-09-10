
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
                className="rounded-lg border border-violet-300 bg-white px-3 py-2 text-sm font-semibold text-violet-900 transition hover:cursor-pointer hover:border-violet-500 focus:outline-2 focus:outline-violet-500 md:text-base"
            >
                <option value="usuk" className="font-medium">US/UK</option>
                <option value="vpop" className="font-medium">V-POP</option>
                <option value="kpop" className="font-medium">K-POP</option>
            </select>
        </div>
    )
}

export default MusicMarketDropDownButton
