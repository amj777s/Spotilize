import { PlaylistInfo } from "@/types";
import TrackPanel from "./TrackPanel";

export default function PlaylistPanel({
    playlistInfo
}:{
    playlistInfo: PlaylistInfo
}){
    return (
        <div className="flex flex-col  gap-2 w-full p-2 border-green-400 border-4 rounded-lg accent-green-400">
            <div className=" w-full flex items-center justify-start gap-10 ">
                <img src={playlistInfo.image} className="w-1/3 h-auto"/>
                <h2 className="text-3xl">{playlistInfo.name}</h2>
            </div>
            <hr className="w-full bg-slate-400 h-2"/>
            {playlistInfo.tracks.map(trackInfo => <TrackPanel key={trackInfo.title + trackInfo.album} trackInfo={trackInfo}  />)}
            
        </div>
    )
}