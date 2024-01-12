'use client'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import OptionsPanel from "@/components/OptionsPanel";
import TopTrackPanel from "@/components/TopTrackPanel";
import { isTrackArray } from "@/types";
import { useLazyGetTopItemsQuery } from "@/redux/slices/apiSlice";
import TopArtistPanel from "@/components/TopArtistPanel";

export default function TopItems() {

    const [getTopItems, { isLoading, error, data }] = useLazyGetTopItemsQuery();
    let content;

    if (isLoading) {
        content = (
            <div className=" flex justify-center items-center gap-3">
            <Spinner />
            <h3 className="font-bold">Loading...</h3>
        </div>
        )
    }
    if (error) {
        console.error(error);
        if ('status' in error) {
            // View the error in the console
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
            content = (
                <h1>Error Fetching... Try Again</h1>
            )
        }
    }

    if (data !== undefined) {
        
        // Example of type predicate
        if (isTrackArray(data)) {
            content = data.map(trackInfo => <TopTrackPanel key={trackInfo.title + trackInfo.release_date} trackInfo={trackInfo} />)
        } else {
            content = data.map(artistInfo => <TopArtistPanel key={artistInfo.name} artistInfo={artistInfo} />)
        }
    }
    if (data === undefined) {
        <h1>No Data Found...</h1>
    }

    return (
        <div className=" scrollbar overflow-y-auto snap-mandatory snap-y flex flex-col sm:flex-row sm:flex-wrap justify-start sm:justify-center  p-5 gap-5 h-full w-full bg-slate-900 text-slate-100 ">
            <OptionsPanel getTopItems={getTopItems} />
            {content}
            <Link href='/' className="fixed left-5 bottom-5 opacity-50 transition duration-300  text-green-400 text-5xl hover:text-green-900 hover:scale-150" ><FaArrowAltCircleLeft /></Link>
        </div>
    )
}