import { TopTrackInfo } from "@/types"

export default function TopTrackPanel({
    trackInfo
}:{
    trackInfo: TopTrackInfo
}){
    return (
        <div className=" snap-center flex flex-col max-w-lg w-full sm:w-5/12 font-bold  p-5 gap-1 border-green-400 border-4 rounded-lg accent-green-400">
            <img  alt='album images' src={trackInfo.album_image} className=" w-full h-auto" />
            <hr className="w-full bg-slate-400 h-1"/>
            <h3>{trackInfo.title}</h3>
            <h3>{trackInfo.album}</h3>
            <h3>{trackInfo.artists.join(", ")}</h3>
            <h3>{`Released: ${trackInfo.release_date}`}</h3>
            <h3>{`Popularity: ${trackInfo.popularity}`}</h3>
        </div>
    )
}