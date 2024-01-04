'use client'
import { Spotify } from "@/spotify/spot";

export default function Login() {
  return (
    <div className="flex flex-col justify-between items-center py-10 bg-login-mobile bg-cover h-full ">
      <h1 className={` text-slate-100 text-7xl font-black underline decoration-green-400 decoration-double `}>Spotilzier</h1>
      <button className=' transition duration-700 p-5 font-bold text-slate-100 text-3xl border-4 border-green-400 rounded-lg  hover:border-slate-100 hover:text-green-400' onClick={Spotify.getSpotifyAuth} >Login</button>
    </div>
  )
}