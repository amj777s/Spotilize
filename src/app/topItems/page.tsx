'use client'
import { FaArrowAltCircleLeft } from "react-icons/fa";
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
            <h1>Loading...</h1> 
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
        <div className=" snap-y flex flex-col overflow-auto  justify-start items-center p-5 gap-5 h-full bg-slate-900 text-slate-100 ">
            <OptionsPanel getTopItems={getTopItems} />
            {content}
            <Link href='/'><FaArrowAltCircleLeft className=" fixed left-5 bottom-5 opacity-50 transition duration-300 text-lime-600 text-5xl hover:text-lime-900 hover:scale-150" /></Link>
        </div>
    )
}