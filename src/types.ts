export type tokenInfo = {
    "access_token": string,
    "refresh_token": string,
    "expires_in": number,

}

export type SpotifyTopSearchParams = {
    'type': 'tracks' | 'artists',
    'timeRange': 'short_term' | 'medium_term' | 'long_term',
    'limit': number,
    'offset': number
}

export type SpotifyArtistInfo = {
    "external_urls": {
        "spotify": string
    },
    "followers": {
        "href": string,
        "total": number
    },
    "genres": string[],
    "href": string,
    "id": string,
    "images": { "url": string, "height": number, "width": number }[],
    "name": string,
    "popularity": number,
    "type": string,
    "uri": string
};

export type SpotifyTrackInfo = {
    "album": {
        "album_type": string,
        "total_tracks": number,
        "available_markets": string[],
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "images": { "url": string, "height": number, "width": number }[],
        "name": string,
        "release_date": string,
        "release_date_precision": string,
        "type": string,
        "uri": string,
        "artists": { "external_urls": { "spotify": string }, "href": string, "id": string, "name": string, "type": string, "uri": string }[]
    },
    "artists": SpotifyArtistInfo[],
    "available_markets": string[],
    "disc_number": number,
    "duration_ms": number,
    "explicit": boolean,
    "is_playable": boolean,
    "external_ids": {
        "isrc": string
    },
    "external_urls": {
        "spotify": string
    },
    "href": string,
    "id": string,
    "name": string,
    "popularity": number,
    "preview_url": string,
    "track_number": number,
    "type": string,
    "uri": string,
    "is_local": boolean
}

export type SpotifyPlaylistInfo = {

    "collaborative": boolean,
    "description": string | null,
    "external_urls": {
        "spotify": string
    },
    "href": string,
    "id": string,
    "images": { "url": string, "height": number, "width": number }[],
    "name": string,
    "owner": {
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "type": string,
        "uri": string,
        "display_name": string
    },
    "public": boolean,
    "snapshot_id": string,
    "tracks": {
        "href": string,
        "total": number
    },
    "type": string,
    "uri": string,
    "primary_color": null

}

export type TopTrackInfo = {
    "popularity": number,
    "title": string,
    "length": string,
    "album": string,
    "release_date": string,
    "artists": string[],
    "album_image": string,
    "uri": string
}

export type TopArtistInfo = {
    "name": string,
    "popularity": number,
    "artist_image": string,
    "genres": string[],

}

export type TrackInfo = {
    title: string,
    length: string,
    artists: string[],
    album: string,
    albumImage: string,
    isPlayable: boolean,
    previewUrl: string,
    uri: string

}

export type PlaylistInfo = {
    name: string,
    public: boolean,
    id: string,
    totalTracks: number,
    tracks: TrackInfo[],
    image: string
}

export type PlaylistCreateData = {
    name: string,
    description: null | string,
    public: boolean,
    uris: string[],
    userId: string
}

export function isTrackArray(data: TopTrackInfo[] | TopArtistInfo[]): data is TopTrackInfo[] {
    return (data as TopTrackInfo[])[0].title !== undefined;
}