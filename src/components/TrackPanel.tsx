import { TrackInfo } from "@/types";
import { FaPlayCircle } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";

export default function TrackPanel({
    trackInfo,
    addable,
    addTrack,
    removeTrack
}: {
    trackInfo: TrackInfo,
    addable: boolean,
    addTrack?: (info:TrackInfo)=> void,
    removeTrack?: (info:TrackInfo) => void
}) {
    return (
        <div className="w-full flex items-center gap-2 ">
            <img src={trackInfo.albumImage} className="h-14 w-14"/>
            <div>
                <h3 className="font-bold whitespace-normal">{trackInfo.title}</h3>
                <h3 className="font-thin whitespace-normal">{trackInfo.artists}</h3>
                <h3 className="font-thin whitespace-normal">{trackInfo.album}</h3>
            </div>
            {trackInfo.isPlayable && <FaPlayCircle className=" ml-auto h-7 w-7 shrink-0 text-green-400"/>}
            {(addable && addTrack)  && <MdAddCircle onClick={()=> addTrack(trackInfo)} className=" h-8 w-8 shrink-0 text-green-400"/>}
            {(addable && removeTrack) && <MdRemoveCircle onClick={()=> removeTrack(trackInfo)} className=" h-8 w-8 shrink-0 text-green-400"/>}


        </div>
    )
}