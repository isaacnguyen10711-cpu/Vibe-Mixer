import type { GeneratedPlaylistProps } from "../types/componentProps";

function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function GeneratedPlaylist(props: GeneratedPlaylistProps) {
    return (
        <div className="mx-4 mb-10 rounded-xl border-2 border-violet-300 bg-white/50 p-4 md:mx-0 md:p-6">
            <h2 className="text-2xl font-bold md:text-3xl">
                {props.playlist.name}
            </h2>
            <p className="mt-2 text-sm md:text-base">
                {props.playlist.description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {props.playlist.songs.map((song) => (
                    <article
                        key={`${song.title}-${song.artist}`}
                        className="flex gap-3 rounded-lg bg-white p-3"
                    >
                        {song.thumbnail_url && (
                            <img
                                src={song.thumbnail_url}
                                alt={`${song.title} thumbnail`}
                                className="h-20 w-20 rounded object-cover md:h-24 md:w-24"
                            />
                        )}

                        <div>
                            <h3 className="font-semibold md:text-lg">
                                {song.title}
                            </h3>
                            <p className="text-sm">{song.artist}</p>

                            {song.duration !== null && song.duration !== 0 && (
                                <p className="mt-1 text-sm">
                                    {formatDuration(song.duration)}
                                </p>
                            )}

                            {song.youtube_url && (
                                <a
                                    href={song.youtube_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-2 inline-block text-sm font-semibold text-violet-700 underline"
                                >
                                    Play on YouTube
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default GeneratedPlaylist;
