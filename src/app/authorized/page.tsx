'use client'

import Spinner from "@/components/Spinner";
import useSWR from "swr";
import { Spotify } from "@/spotify/spot";
import { useRouter } from "next/navigation";

const getTokens = async(url:string) =>{
    // On page load, try to fetch auth code from current browser search URL
    const args = new URLSearchParams(window.location.search);
    const code:string= args.get('code')?? '';
    const tokens = await Spotify.getTokens(code);
    Spotify.saveTokens(tokens);
    return tokens; // Need to return something in order for data to be valid and allow router to push 

}
export default function Authorized() {
    
    const { data, error, isLoading } = useSWR('/', getTokens);
    const router = useRouter();

    let content;

    if(error){
    
       content =  (
            <h3>{error}</h3>
        )
    }

    if(isLoading){
        content = (
            <div className=" h-full w-full flex justify-center items-center gap-3">
            <Spinner />
            <h3 className="font-bold">Authorizing...</h3>
        </div>
        )
    }

    if (data){
       router.push('/');
        content = (
            <div className=" h-full w-full flex justify-center items-center gap-3">
            <Spinner />
            <h3 className="font-bold">Redirecting...</h3>
        </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full h-full bg-slate-900 text-slate-100">
            {content}
        </div>
    )
    
}