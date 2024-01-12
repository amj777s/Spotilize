import { PlaylistInfo } from "@/types";
import TrackPanel from "./TrackPanel";

export default function PlaylistPanel({
    playlistInfo,
    addable // Used to control whether tracks can be added to the playlist
}:{
    playlistInfo: PlaylistInfo,
    addable: boolean
}){
    return (
        <div className= " scrollbar snap-center max-w-xl w-full h-full overflow-y-auto inline-flex flex-col mr-4 gap-2 p-2 border-green-400 border-4 rounded-lg accent-green-400">
            <div className="w-full flex items-center justify-start gap-10 ">
                <img src={playlistInfo.image} className="w-1/3 h-auto"/>
                <h2 className="text-3xl whitespace-normal">{playlistInfo.name}</h2>
            </div>
            <hr className="w-full bg-slate-400 h-1"/>
            {playlistInfo.tracks.map(trackInfo => <TrackPanel key={trackInfo.title + trackInfo.album} trackInfo={trackInfo} addable={addable}  />)}

        </div>
    )
}