"use client"
import PlaylistPanel from "@/components/PlaylistPanel";
import { useGetPlaylistsQuery } from "@/redux/slices/apiSlice";


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
      
        content =  data.map(playlists=> <PlaylistPanel key={playlists.id} playlistInfo={playlists} />)
    }

    return (
        <div className=" flex flex-col p-5 gap-5 overflow-y-scroll h-full bg-slate-900 text-slate-100">
            {content}
        </div>
    )
}   