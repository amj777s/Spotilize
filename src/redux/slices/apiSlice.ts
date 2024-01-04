import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'
import { Spotify } from "@/spotify/spot";
import { SpotifyTopSearchParams, TopArtistInfo, TopTrackInfo } from "@/types";


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
    }
})

const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    //need else statement to handle error
    if(result.error && result.error.status == 401){
        // try to get a new token
        console.log("getting new token");
        await Spotify.getRefreshToken();
        console.log("new token fetched");
        result = await baseQuery(args, api, extraOptions);
    }
    return result
}

export const spotifyApi = createApi({
    reducerPath: "spotifyApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
       
        getUserData: builder.query({
            query: () => 'me'
        }),
        
        // In future find type for response instead of bypassing error with any
        getTopItems: builder.query({
            query: (params:SpotifyTopSearchParams) => `me/top/${params.type}?time_range=${params.timeRange}&limit=${params.limit}&offset=${params.offset}`,
            transformResponse: (response: any, meta,arg: SpotifyTopSearchParams)=> {
                console.log(arg)
                if(arg.type === 'tracks'){
                    const refinedResponse: TopTrackInfo[] = [];
                    response.items.map(info => {
                        const trackInfo = {} as TopTrackInfo;
                        trackInfo.title = info.name;
                        trackInfo.popularity = info.popularity;
                        const minutes = Math.floor(info.duration_ms /1000 /60);
                        const seconds = Math.floor(info.duration_ms/1000 % 60 );
                        trackInfo.length = seconds > 10 ? `${minutes}:${seconds}`: `${minutes}:0${seconds}`;
                        trackInfo.artists = info.artists.map(artist => artist.name);
                        trackInfo.album = info.album.name;
                        trackInfo.release_date = info.album.release_date;
                        trackInfo.album_image = info.album.images[0].url;
                        refinedResponse.push(trackInfo);
                })

                    return refinedResponse

                }
                else{
                    console.log('here');
                    const refinedResponse: TopArtistInfo[] = [];
                    response.items.map(info => {
                        const artistInfo = {} as TopArtistInfo;
                        artistInfo.name = info.name;
                        artistInfo.genres = info.genres;
                        artistInfo.popularity = info.popularity;
                        artistInfo.artist_image = info.images[0].url;
                        refinedResponse.push(artistInfo);
                    })

                    return refinedResponse
                }
                
            }
        }),
        
        getPlaylists: builder.query({
            query: (arg: void) => 'me/playlists',
            transformResponse: (response: any, arg, meta) => {
                return response.items.map(playlistInfo => {
                    return {
                        name: playlistInfo.name,
                        public: playlistInfo.public,
                        id: playlistInfo.id,
                        tracks: playlistInfo.tracks.total
                    }
                } )
            }
        }) 
    })
});

export const { useGetUserDataQuery, useLazyGetTopItemsQuery, useGetPlaylistsQuery } = spotifyApi;

// name: playlistInfo.name,
// public: playlistInfo.public,
// id: playlistInfo.id,
// tracks: playlistInfo.tracks.total

