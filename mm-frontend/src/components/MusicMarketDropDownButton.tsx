
function MusicMarketDropDownButton(props: { onChange: (market: string) => void }) {
    return (
        <select onChange={(e) => props.onChange(e.target.value)}>
            <option value="">Select Music Market</option>
            <option value="usuk">US-UK</option>
            <option value="vpop">V-POP</option>
            <option value="kpop">K-POP</option>
        </select>
    )
}

export default MusicMarketDropDownButton