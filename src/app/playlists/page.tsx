"use client"
import PlaylistPanel from "@/components/PlaylistPanel";
import Spinner from "@/components/Spinner";
import { useGetPlaylistsQuery } from "@/redux/slices/apiSlice";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";


export default function Playlists() {

    const { data, error, isLoading } = useGetPlaylistsQuery();
    let content;

    if (error) {

        console.error(error);
        content = (
            <div>
                <h3>Something went Wrong...</h3>
                <h3>Try again</h3>
            </div>
        )

    }

    if (isLoading) {
        content = (
            <div className=" h-full w-full flex justify-center items-center gap-3">
                <Spinner />
                <h3 className="font-bold">Loading...</h3>
            </div>
        )
    }

    if (data) {

        content = data.map(playlists => <PlaylistPanel key={playlists.id} playlistInfo={playlists} addable={false} />)
    }

    return (
        <div className="scrollbar snap-mandatory snap-x p-5 overflow-x-auto w-full h-full whitespace-nowrap bg-slate-900 text-slate-100">
            {content}
            <Link href='/' className="fixed left-5 bottom-5 opacity-50 transition duration-300  text-green-400 text-5xl hover:text-green-900 hover:scale-150" ><FaArrowAltCircleLeft /></Link>
        </div>
    )
}   