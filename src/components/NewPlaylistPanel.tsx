'use client'

import { PlaylistCreateData, TrackInfo } from "@/types"
import TrackPanel from "./TrackPanel"
import { useCreatePlaylistsMutation, useGetUserDataQuery } from "@/redux/slices/apiSlice"
import { useEffect, useState } from "react"
import Popup from "./Popup"

export default function NewPlaylistPanel({
    trackList,
    removeTrack,
    removeAllTracks
}: {
    trackList: TrackInfo[],
    removeTrack: (info: TrackInfo) => void,
    removeAllTracks: () => void
}) {
    const [playlistName, setPlaylistName] = useState<string>('');
    const [privateOption, setPrivate] = useState<boolean>(true);
    const userData = useGetUserDataQuery();
    const [addPlaylst, { data, isLoading, isError }] = useCreatePlaylistsMutation();
    const [message, setMessage] = useState<string>('');
    const [popUpVisible, setPopUpVisibility] = useState<boolean>(false);

    const createPlaylist = () => {
        const args: PlaylistCreateData = {
            name: playlistName,
            description: null, // Possible create text area for people to add description
            public: privateOption, // crate,
            uris: trackList.map(trackInfo => trackInfo.uri),
            userId: userData.data.id
        };
        addPlaylst(args);
    }

    useEffect(() => {
        if (isError) {
            setMessage('Something went wrong... Try again');
            setPopUpVisibility(true);
        }
    }, [isError])

    useEffect(() => {
        if (data) {
            setMessage('Playlist Uploaded!');
            setPopUpVisibility(true);
            setPlaylistName('');
            removeAllTracks();
        }
    }, [data])



    let content;

    if (isLoading) {
        content = <h1>loading...</h1>
    } else {
        content = trackList.map(trackInfo => <TrackPanel key={trackInfo.title + trackInfo.artists[0] + trackInfo.album} trackInfo={trackInfo} addable={true} removeTrack={removeTrack} />);
    }






    return (
        <div className="inline-flex flex-col snap-center overflow-y-auto max-w-2xl w-full md:w-5/12 h-full md:mr-4 md:float-right  gap-5 p-3 items-center border-green-400 border-4 rounded-lg accent-green-400">
            <h1 className="font-bold">Playlist Name:</h1>
            <input name='playlist' className=" bg-slate-700 w-full rounded-lg p-2 text-2xl" type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
            <label>
                Private:
                <input type="checkbox" name="privateOption" checked={privateOption} onChange={(e) => setPrivate(e.target.checked)} />
            </label>
            <button className="w-full transition duration-300 p-4 font-bold border-green-400 border-4 rounded-lg hover:border-slate-200 hover:text-green-400" onClick={createPlaylist}>Create Playlist</button>
            <hr className="w-full h-1 text-slate-200" />
            {content}
            <Popup message={message} visible={popUpVisible} setPopUpVisibility={setPopUpVisibility} />
        </div>
    )
}