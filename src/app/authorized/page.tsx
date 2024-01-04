'use client'
import { useEffect } from "react";
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

    if(error){
    
        return (
            <p>{error}</p>
        )
    }

    if(isLoading){
        return (
            <p>Authorizing...</p>
        )
    }

    if (data){
       router.push('/');
        return (
            <p>redirecting...</p>
        )
    }
    
}