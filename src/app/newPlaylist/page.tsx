'use client'
import ResultsPanel from "@/components/ResultsPanel";
import Link from "next/link";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import NewPlaylistPanel from "@/components/NewPlaylistPanel";
import { TrackInfo } from "@/types";

export default function NewPlaylist() {
    const [tracks, setTracks] = useState<TrackInfo[]>([]);

    const addTrack = (info: TrackInfo) => {
        if(!tracks.includes(info)){
            const updatedSongs = [...tracks, info];
            setTracks(updatedSongs);
        }

    }

    const removeTrack = (info: TrackInfo) => {
        const updatedTracks = tracks.filter(track => track !== info);
        setTracks(updatedTracks);
    }

    const removeAllTracks = () => {
        setTracks([]);
    }
    

    
    return (
        <div className="snap-x p-5 overflow-x-auto w-full h-full whitespace-nowrap bg-slate-900 text-slate-100">
            <ResultsPanel addTrack={addTrack} />
            <NewPlaylistPanel removeTrack={removeTrack} trackList={tracks} removeAllTracks={removeAllTracks}/>
            <Link href='/'><FaArrowAltCircleLeft className=" fixed left-8 bottom-8 opacity-50 transition duration-300 text-lime-600 text-5xl hover:text-lime-900 hover:scale-150" /></Link>
        </div>
    )
}