import { TrackInfo } from "@/types";

export default function TrackPanel({
    trackInfo
}: {
    trackInfo: TrackInfo
}) {
    return (
        <div className="w-full flex items-center gap-2">
            <img src={trackInfo.albumImage} className=" h-14 w-14"/>
            <div>
                <h3 className=" font-bold">{trackInfo.title}</h3>
                <h3 className="font-thin">{trackInfo.artists}</h3>
                <h3 className="font-thin">{trackInfo.album}</h3>
            </div>

        </div>
    )
}