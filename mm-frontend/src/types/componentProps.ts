import type { GeneratedPlaylistData } from "./playlist";

export type ButtonRowProps = {
    selectedMood: number;
    setMood: (mood: number) => void;
};

export type GenerateButtonProps = {
    onClick: () => void;
};

export type MusicMarketDropDownButtonProps = {
    value: string;
    onChange: (market: string) => void;
};

export type GeneratedPlaylistProps = {
    playlist: GeneratedPlaylistData;
};
