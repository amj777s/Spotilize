"use client"
import { useGetPlaylistsQuery } from "@/redux/slices/apiSlice";


export default function Playlists() {

    const { data, error, isLoading } = useGetPlaylistsQuery();
    let content;

    if (error) {
        if ('status' in error) {
            // View the error in the console
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
            console.error(errMsg);
            content = (
                <div>
                    <h3>Something went Wrong...</h3>
                    <h3>Try again</h3>
                </div>
            )
        }
    }

    if (isLoading) {
        content = (
            <h3>Loading...</h3>
        )
    }

    if (data) {
        console.log(data);
        
        content = (
            <h3>check console</h3>
        )
    }

    return (
        <div className=" p-5 gap-5 h-full bg-slate-900 text-slate-100">
            {content}
        </div>
    )
}