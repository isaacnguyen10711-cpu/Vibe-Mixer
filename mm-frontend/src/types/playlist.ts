export type GeneratedSong = {
    title: string;
    artist: string;
    description: string | null;
    duration: number | null;
    youtube_url: string | null;
    thumbnail_url: string | null;
};

export type GeneratedPlaylistData = {
    name: string;
    description: string;
    songs: GeneratedSong[];
};
