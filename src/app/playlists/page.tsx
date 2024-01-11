"use client"
import PlaylistPanel from "@/components/PlaylistPanel";
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
            <h3>Loading...</h3>
        )
    }

    if (data) {
      
        content =  data.map(playlists=> <PlaylistPanel key={playlists.id} playlistInfo={playlists} addable={false}/>)
    }

    return (
        <div className=" snap-mandatory snap-x p-5 overflow-x-auto w-full h-full whitespace-nowrap bg-slate-900 text-slate-100">
            {content}
            <Link href='/' className="fixed left-5 bottom-5 opacity-50 transition duration-300  text-green-400 text-5xl hover:text-green-900 hover:scale-150" ><FaArrowAltCircleLeft /></Link>
        </div>
    )
}   