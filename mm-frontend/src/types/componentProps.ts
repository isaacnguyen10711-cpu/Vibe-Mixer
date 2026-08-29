import type { GeneratedPlaylistData } from "./playlist";

export type ButtonRowProps = {
    selectedMood: number;
    setMood: (mood: number) => void;
};

export type ActionButtonProps = {
    onClick: () => void;
};

export type MusicMarketDropDownButtonProps = {
    value: string;
    onChange: (market: string) => void;
};

export type GeneratedPlaylistProps = {
    playlist: GeneratedPlaylistData; 
};

export type IsLoadingPopUpProps = {
    loading: boolean;
};
