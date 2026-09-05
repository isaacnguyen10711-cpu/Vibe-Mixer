import { useState } from "react";
import type { GeneratedPlaylistData } from "../types/playlist";

type GeneratedPlaylistProps = {
    playlist: GeneratedPlaylistData;
    isPlayingAllVideos?: boolean;
    onCloseAllVideos?: () => void;
};

function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function GeneratedPlaylist(props: GeneratedPlaylistProps) {
    const [videoUrl, setVideoUrl] = useState("");

    // Extract video IDs from the playlist's YouTube URLs
    const videoIdList = props.playlist.songs
        .map((song) => song.youtube_url?.split("v=")[1]?.split("&")[0])
    
    // Build the YouTube playlist URL using the extracted video IDs and join them
     const playlistUrl =
        `https://www.youtube.com/embed?autoplay=1&playlist=${videoIdList.join(",")}`;

    return (
        <>
        {props.isPlayingAllVideos && videoIdList.length > 0 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-2xl rounded-lg bg-white p-3">
                    <iframe
                        src={playlistUrl}
                        title="YouTube video"
                        className="aspect-video w-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                    <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={props.onCloseAllVideos}
                        className="mt-3 rounded bg-violet-600 px-4 py-2 text-white hover:cursor-pointer"
                    >
                        Close
                    </button>
                    </div>
                </div> 
            </div>
        )}


        {videoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-2xl rounded-lg bg-white p-3">
                    <iframe
                        src={videoUrl}
                        title="YouTube video"
                        className="aspect-video w-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                    <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setVideoUrl("")}
                        className="mt-3 rounded bg-violet-600 px-4 py-2 text-white hover:cursor-pointer"
                    >
                        Close
                    </button>
                    </div>
                </div> 
            </div>
        )}

        <div className="mx-3 my-2 rounded-xl border-2 border-violet-300 bg-white/50 p-3 md:mx-0 md:my-4 md:p-2 lg:my-6 lg:p-5">
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
                                type="button"
                                className="cursor-pointer"
                                onClick={() => song.youtube_url && setVideoUrl(song.youtube_url.replace("watch?v=", "embed/") + "?autoplay=1")}
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
                                <button
                                    type="button"
                                    onClick={() => song.youtube_url && setVideoUrl(song.youtube_url.replace("watch?v=", "embed/") + "?autoplay=1")}
                                    className="mt-auto pt-1 text-xs font-semibold text-violet-700 hover:cursor-pointer underline lg:text-sm"
                                >
                                    Play video
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default GeneratedPlaylist;
