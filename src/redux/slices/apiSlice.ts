

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'
import { Spotify } from "@/spotify/spot";
import { PlaylistCreateData, PlaylistInfo, SpotifyTopSearchParams, TopArtistInfo, TopTrackInfo, TrackInfo, SpotifyArtistInfo, SpotifyTrackInfo, SpotifyPlaylistInfo } from "@/types";


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
            query: (arg:void) => 'me'
        }),
        
        // In future find type for response instead of bypassing error with any
        getTopItems: builder.query({
            query: (params:SpotifyTopSearchParams) => `me/top/${params.type}?time_range=${params.timeRange}&limit=${params.limit}&offset=${params.offset}`,
            transformResponse: (response: any, meta, arg: SpotifyTopSearchParams)=> {
                console.log(arg)
                if(arg.type === 'tracks'){
                    const refinedResponse: TopTrackInfo[] = [];
                    response.items.map((info:SpotifyTrackInfo) => {
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
                        trackInfo.uri = info.uri;
                        refinedResponse.push(trackInfo);
                })

                    return refinedResponse

                }
                else{
                    const refinedResponse: TopArtistInfo[] = [];
                    response.items.map((info:SpotifyArtistInfo) => {
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
           queryFn: async(arg: void, api, extraOptions) => {
            
            try {
                const playlists: PlaylistInfo[] = [];
                const {data}:{data?:any} = await baseQueryWithReauth({url: 'me/playlists'},api, extraOptions);
                
                // Fetch data related to playlists
                data.items.map((playlistInfo: SpotifyPlaylistInfo) => {
                    const playlist = {} as PlaylistInfo;
                    playlist.name = playlistInfo.name;
                    playlist.public = playlistInfo.public;
                    playlist.id = playlistInfo.id;
                    playlist.totalTracks = playlistInfo.tracks.total;
                    playlists.push(playlist);
                    playlist.tracks = [];
                })
                // Fetch data related to tracks in playlists
               await Promise.all(playlists.map(async (info, index) => {
                    const {data}:{data?:any} = await baseQueryWithReauth({url:`playlists/${info.id}`}, api, extraOptions);
                    console.log(data);
                    playlists[index].image = data.images[0].url;
                    data.tracks.items.map((trackInfo:{track:SpotifyTrackInfo}) => {
                        const track = {} as TrackInfo;
                        track.title = trackInfo.track.name;
                        const minutes = Math.floor(trackInfo.track.duration_ms /1000 /60);
                        const seconds = Math.floor(trackInfo.track.duration_ms/1000 % 60 );
                        track.length = seconds > 10 ? `${minutes}:${seconds}`: `${minutes}:0${seconds}`;
                        track.artists = trackInfo.track.artists.map(artist => artist.name);
                        track.album = trackInfo.track.album.name;
                        track.albumImage = trackInfo.track.album.images[0].url;
                        track.isPlayable = trackInfo.track.is_playable;
                        track.previewUrl = trackInfo.track.preview_url;
                        track.uri = trackInfo.track.uri;
                        playlists[index].tracks.push(track);

                    });

               }))
                
                return {data: playlists, error: undefined}
            
            } catch (error) {
                console.log(`this is ${error}`);
                return {error: {status: 500, statusText: error,  data: undefined}, }
            }
          
        }
        }),
        
        getTracks: builder.query({
            query: (url:string) => url,
            transformResponse: (response: any, meta, arg: string) => {
                const tracks: TrackInfo[] = [];
                response.tracks.items.map((trackInfo:SpotifyTrackInfo) => {
                    const track = {} as TrackInfo;
                    track.title = trackInfo.name;
                    const minutes = Math.floor(trackInfo.duration_ms /1000 /60);
                    const seconds = Math.floor(trackInfo.duration_ms/1000 % 60 );
                    track.length = seconds > 10 ? `${minutes}:${seconds}`: `${minutes}:0${seconds}`;
                    track.artists = trackInfo.artists.map(artist => artist.name);
                    track.album = trackInfo.album.name;
                    track.albumImage = trackInfo.album.images[0].url;
                    track.isPlayable = trackInfo.is_playable;
                    track.previewUrl = trackInfo.preview_url;
                    track.uri = trackInfo.uri;
                    tracks.push(track);

                });
                return tracks
            }
        }),

        createPlaylists: builder.mutation({
            queryFn: async (arg:PlaylistCreateData, api, extraOptions)=> {
                try {
                    const body = {
                        "name":arg.name,
                        "description": arg.description,
                        "public": arg.public

                    }
                    console.log(arg);
                    const playlistInfo:any = await baseQueryWithReauth({method: "POST", url: `users/${arg.userId}/playlists`, body:body},api, extraOptions);
                    const playListID: string  = playlistInfo.data.id;
                    const playlistBody = {
                        "uris": arg.uris
                    }
                    const {data} = await baseQueryWithReauth({method:"POST", url: `playlists/${playListID}/tracks`, body:playlistBody}, api, extraOptions);

                    return {data: 'Playlist Created', error: undefined}
                    
                } catch (error) {
                    console.log(`this is ${error}`);
                    return {error: {status: 500, statusText: error,  data: undefined}, }
                }
            }
        })
    })
});

export const { useGetUserDataQuery, useLazyGetTopItemsQuery, useGetPlaylistsQuery,useLazyGetTracksQuery, useCreatePlaylistsMutation } = spotifyApi;

