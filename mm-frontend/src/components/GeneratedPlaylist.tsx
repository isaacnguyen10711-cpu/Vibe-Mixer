import type { GeneratedPlaylistData } from "../types/playlist";

type GeneratedPlaylistProps = {
    playlist: GeneratedPlaylistData;
};

function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function GeneratedPlaylist(props: GeneratedPlaylistProps) {
    return (
        <div className="mx-3 my-2 rounded-xl border-2 border-violet-300 bg-white/50 p-3 md:mx-0 md:my-4 md:p-2 lg:my-8 lg:p-5">
            <h2 className="text-base font-bold md:text-lg lg:text-xl">
                {props.playlist.name}
            </h2>
            <p className="mt-1 max-w-3xl text-xs md:text-sm lg:mt-2 lg:text-base">
                {props.playlist.description}
            </p>

            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2 lg:mt-4 lg:gap-3">
                {props.playlist.songs.map((song) => (
                    <div
                        key={`${song.title}-${song.artist}`}
                        className="flex min-w-0 flex-col overflow-hidden rounded-lg bg-white p-2 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 md:flex-row md:gap-2 md:p-2 lg:p-3"
                    >
                        {song.thumbnail_url && (
                            <button
                                className="cursor-pointer"
                                onClick={() => window.open(song.youtube_url ? song.youtube_url : "", "_blank")}
                            >
                                <img
                                    src={song.thumbnail_url}
                                    alt={`${song.title} thumbnail`}
                                    className="aspect-video w-full rounded object-cover md:h-12 md:w-12 md:shrink-0 md:aspect-square lg:h-20 lg:w-20"
                                />
                            </button>
                        )}

                        <div className="flex min-w-0 flex-1 flex-col pt-2 md:pt-0">
                            <h3 className="break-words text-xs font-semibold leading-tight lg:text-base">
                                {song.title}
                            </h3>
                            <p className="break-words text-xs lg:text-sm">{song.artist}</p>

                            {song.duration !== null && song.duration !== 0 && (
                                <p className="text-xs">
                                    {formatDuration(song.duration)}
                                </p>
                            )}

                            {song.youtube_url && (
                                <a
                                    href={song.youtube_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-auto pt-1 text-xs font-semibold text-violet-700 underline lg:text-sm"
                                >
                                    Play on YouTube
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GeneratedPlaylist;
