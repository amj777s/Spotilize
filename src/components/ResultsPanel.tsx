import { useState } from "react"
import { useGetUserDataQuery, useLazyGetTracksQuery } from "@/redux/slices/apiSlice";
import TrackPanel from "./TrackPanel";
import { TrackInfo } from "@/types";
import Spinner from "./Spinner";
export default function ResultsPanel({
    addTrack
}:{
    addTrack?: (info:TrackInfo) => void
}){
    const [search, setSearch] = useState<string>(''); 
    const [getTracks, { isLoading, error, data }] = useLazyGetTracksQuery();
    const userData = useGetUserDataQuery(); //keep search bar disabled until user data loads
    
    let content;

    const handleSearch = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const search_string:string = search.trim().split(' ').join('+');
        const market = userData.data.country ?? '';
        const url:string = `search?q=${search_string}&type=track&limit=25&market=${market}`
        getTracks(url);
    };
    
    if (isLoading) {
        content = (
            <div className="  flex justify-center items-center gap-3">
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
       content = data.map(trackInfo => <TrackPanel key={trackInfo.title + trackInfo.artists[0] +trackInfo.album} trackInfo={trackInfo} addable={true} addTrack={addTrack} />)
    }
    if (data === undefined) {
        <h1>No Data Found...</h1>
    }
    
    return (
        <div className=" scrollbar inline-flex flex-col snap-center overflow-y-auto max-w-2xl w-full md:w-5/12 h-full  gap-5 p-3 mr-4  md:mr-0 md:ml-4 md:float-left items-center border-green-400 border-4 rounded-lg">
            <input name='searchbar' className="w-full bg-slate-700 rounded-lg " type="text" placeholder="Search for a track..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className=" w-full transition duration-300 p-4 font-bold border-green-400 border-4 rounded-lg hover:border-slate-200 hover:text-green-400" onClick={handleSearch}>Search</button>
            <h1>Results</h1>
            <hr className="w-full h-1 text-slate-200" />
            {content}
            
        </div>
    )
}