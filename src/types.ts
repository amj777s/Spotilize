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

export type TopTrackInfo = {
    "popularity": number,
    "title": string,
    "length": string,
    "album": string,
    "release_date": string,
    "artists": string [],
    "album_image": string
}

export type TopArtistInfo = {
    "name": string,
    "popularity": number,
    "artist_image": string,
    "genres": string [],

}

export function isTrackArray(data: TopTrackInfo[] | TopArtistInfo[]): data is TopTrackInfo[] {
    return (data as TopTrackInfo[])[0].title !== undefined;
  }