import { TopArtistInfo } from "@/types"

export default function TopArtistPanel({
    artistInfo
}:{
    artistInfo:TopArtistInfo
}){
    return (
        <div className=" snap-center flex flex-col max-w-lg w-full sm:w-5/12  font-bold  p-5 gap-1 border-green-400 border-4 rounded-lg accent-green-400">
            <img  alt='artist image' src={artistInfo.artist_image} className=" w-full h-auto" />
            <hr className="w-full bg-slate-400 h-1"/>
            <h3>{artistInfo.name}</h3>
            <h3>{artistInfo.genres}</h3>
            <h3>{`Popularity: ${artistInfo.popularity}`}</h3>
        </div>
    )
}