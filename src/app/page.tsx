'use client'

import { useGetUserDataQuery } from "@/redux/slices/apiSlice";
import { useRouter } from "next/navigation"
import { FaCircleUser, FaStore, FaUsers, FaRectangleList } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RiPlayListAddLine, RiPlayList2Fill } from "react-icons/ri";
import Link from "next/link";
import Spinner from "@/components/Spinner";

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
    return (
      <div className=" h-full w-full flex justify-center items-center gap-3">
        <Spinner />
        <h3 className="font-bold">Loading...</h3>
      </div>
    )
  }


  return (
    <div className="flex flex-wrap gap-5 content-center justify-center items-center w-full h-full bg-slate-900  border-green-400 border-4  ">

      <div className="flex w-full gap-5 items-center justify-center">
        <FaCircleUser className="text-green-400 text-3xl" />
        <h1 className="text-green-400 font-bold text-3xl">{data.display_name}</h1>
      </div>

      <div className="flex w-full gap-5 items-center justify-center ">
        <FaStore className="text-green-400 text-2xl" />
        <h1 className="text-green-400 font-bold text-2xl">{`${data.product} user`}</h1>
      </div>

      <div className="flex w-full gap-5 items-center justify-center">
        <FaUsers className="text-green-400 text-2xl" />
        <h1 className="text-green-400 font-bold text-2xl">{`${data.followers.total} followers`}</h1>
      </div>

      <div className="transition duration-500 flex flex-wrap gap-4 sm:w-72 sm:h-72 items-center justify-center sm:border-4 sm:border-purple-500 sm:rounded-lg hover:border-green-400  ">
        <FaRectangleList className="text-green-400 text-2xl sm:text-5xl sm:w-5/12" />
        <h1 className="text-green-400 font-bold text-2xl sm:text-3xl sm:w-5/12">User Insights</h1>
        <Link href='/topItems'><FaArrowAltCircleRight className="transition duration-300 text-green-400 text-2xl sm:text-6xl hover:text-green-600 hover:scale-150" /></Link>
      </div>

      <div className="transition duration-500 flex flex-wrap gap-4 sm:w-72 sm:h-72 items-center sm:justify-center sm:border-4 sm:border-purple-500 sm:rounded-lg hover:border-green-400  ">
        <RiPlayListAddLine className="text-green-400 text-2xl sm:text-5xl sm:w-5/12" />
        <h1 className="text-green-400 font-bold text-2xl sm:text-3xl sm:w-5/12">Create Playlist</h1>
        <Link href='/newPlaylist'><FaArrowAltCircleRight className="transition duration-300 text-green-400 text-2xl sm:text-6xl hover:text-green-600 hover:scale-150" /></Link>
      </div>

      <div className="transition duration-500 flex flex-wrap gap-4 sm:w-72 sm:h-72 items-center sm:justify-center sm:border-4 sm:border-purple-500 sm:rounded-lg hover:border-green-400  ">
        <RiPlayList2Fill className="text-green-400 text-2xl sm:text-5xl sm:w-5/12" />
        <h1 className="text-green-400 font-bold text-2xl sm:text-3xl sm:w-5/12">View Playlists</h1>
        <Link href='/playlists'><FaArrowAltCircleRight className="transition duration-300 text-green-400 text-2xl sm:text-6xl hover:text-green-600 hover:scale-150" /></Link>
      </div>
    </div>

  )
}

/* INFO
------------------------------

*/
