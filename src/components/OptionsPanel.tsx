import { SpotifyTopSearchParams } from "@/types";
import { useState } from "react"

export default function OptionsPanel({
    getTopItems
}: {
    getTopItems: any  // Figure out the type
}) {
    const [options, setOptions] = useState<SpotifyTopSearchParams>({ 'type': 'tracks', 'timeRange': 'short_term', 'limit': 5, 'offset': 0 });

    const handleCheckOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'timeRange':
                setOptions({
                    ...options,
                    timeRange: value as "short_term" | "medium_term" | "long_term" //prevent eslint error

                })
                break;
            case 'type':
                setOptions({
                    ...options,
                    type: value as "tracks" | "artists"
                })
                break;
            case 'limit':
                setOptions({
                    ...options,
                    limit: Number(value)
                })
                break;
            case 'offset':
                setOptions({
                    ...options,
                    offset: Number(value)
                })
                break;

            default:
                break;
        }

    }

    return (
        <div className="snap-center flex flex-col  max-w-lg  w-full sm:w-5/12  gap-6 py-5 px-2 text-slate-200 border-green-400 border-4 rounded-lg accent-green-400">
            <div className="flex justify-between">
                <div className="flex flex-col text-lg">
                    <h2 className="font-bold text-center underline decoration-green-400 decoration-2">Time Range</h2>
                    <label>
                        <input className="mr-1" type="radio" name="timeRange" value="short_term" checked={options.timeRange === 'short_term'} onChange={handleCheckOptions} />
                        Short Term
                    </label >
                    <label>
                        <input className="mr-1" type="radio" name="timeRange" value="medium_term" checked={options.timeRange === 'medium_term'} onChange={handleCheckOptions} />
                        Medium Term
                    </label>
                    <label>
                        <input className="mr-1" type="radio" name="timeRange" value="long_term" checked={options.timeRange === 'long_term'} onChange={handleCheckOptions} />
                        Long Term
                    </label>
                </div>

                <div className="flex flex-col text-lg">
                    <h2 className="font-bold text-center underline decoration-green-400 decoration-2">Type</h2>
                    <label>
                        <input className="mr-1" type="radio" name="type" value="artists" checked={options.type === 'artists'} onChange={handleCheckOptions} />
                        Artists
                    </label >
                    <label>
                        <input className="mr-1" type="radio" name="type" value="tracks" checked={options.type === 'tracks'} onChange={handleCheckOptions} />
                        Tracks
                    </label>
                </div>
            </div>
            <div className="flex flex-col ">
                <h2 className="font-bold underline decoration-green-400 decoration-2 "># of Results</h2>
                <input type="range" name="limit" min={3} max={20} step={1} value={options.limit} onChange={handleCheckOptions}></input>
                <p className="text-right">{options.limit}</p>

            </div>

            <div className="flex flex-col">
                <h2 className="font-bold underline decoration-green-400 decoration-2">Offset</h2>
                <input type="range" name="offset" min={0} max={20} step={1} value={options.offset} onChange={handleCheckOptions}></input>
                <p className="text-right">{options.offset}</p>
            </div>
            <button className=" transition mt-auto  duration-300 p-4 font-bold border-green-400 border-4 rounded-lg hover:border-slate-200 hover:text-green-400 " onClick={() => getTopItems(options)}>Search</button>
        </div>
    )
}