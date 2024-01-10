'use client'

import { useGetUserDataQuery } from "@/redux/slices/apiSlice";
import { useRouter } from "next/navigation"
import { FaCircleUser, FaStore, FaUsers, FaRectangleList } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiPlayListAddLine, RiPlayList2Fill } from "react-icons/ri";
import Link from "next/link";

export default function Home() {

  const router = useRouter();

  const access_token = localStorage.getItem('access_token');
if (access_token === null || access_token === 'undefined') {
    router.push('/login');
}


  const { data, error, isLoading } = useGetUserDataQuery();

  // Include button to reload page

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    }
    else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }


  return (
    <div className="flex flex-col flex-wrap justify-center items-center gap-5 h-full bg-slate-900 ">
      
      <div className="flex gap-5 items-center ">
        <FaCircleUser className="text-lime-600 text-3xl" />
        <h1 className="text-lime-600 font-bold text-3xl">{data.display_name}</h1>
      </div>
      
      <div className="flex gap-5 items-center ">
        <FaStore className="text-lime-600 text-2xl" />
        <h1 className="text-lime-600 font-bold text-2xl">{`${data.product} user`}</h1>
      </div>
     
      <div className="flex gap-5 items-center ">
        <FaUsers className="text-lime-600 text-2xl" />
        <h1 className="text-lime-600 font-bold text-2xl">{`${data.followers.total} followers`}</h1>
      </div>
      
      <div className="flex gap-5 items-center ">
        <FaRectangleList className="text-lime-600 text-2xl" />
        <h1 className="text-lime-600 font-bold text-2xl">User Insights</h1>
        <Link href='/topItems'><FaArrowAltCircleRight className="transition duration-300 text-lime-600 text-2xl hover:text-lime-900 hover:scale-150" /></Link>
      </div>
      
      <div className="flex gap-5 items-center ">
        <RiPlayListAddLine className="text-lime-600 text-2xl" />
        <h1 className="text-lime-600 font-bold text-2xl">Create Playlist</h1>
        <Link href='/newPlaylist'><FaArrowAltCircleRight className="transition duration-300 text-lime-600 text-2xl hover:text-lime-900 hover:scale-150" /></Link>
      </div>
      
      <div className="flex gap-5 items-center ">
        <RiPlayList2Fill className="text-lime-600 text-2xl" />
        <h1 className="text-lime-600 font-bold text-2xl">View Playlists</h1>
        <Link href='/playlists'><FaArrowAltCircleRight className=" transition duration-300 text-lime-600 text-2xl hover:text-lime-900 hover:scale-150" /></Link>
      </div>
    </div>
  )
}

/* INFO
------------------------------

*/
