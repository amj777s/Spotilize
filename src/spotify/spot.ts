import { tokenInfo } from "@/types";
const clientId: string = "ddd4cd46cead49c3ad709c3589142705";
const redirectUrl: string = 'http://localhost:3000/authorized';
const authURL: string = "https://accounts.spotify.com/authorize?";
const baseURL: string = 'https://api.spotify.com/v1/';
const tokenEndpoint: string = "https://accounts.spotify.com/api/token";
const scope: string = "playlist-read-private playlist-modify-public playlist-modify-private user-read-email user-top-read  user-read-private user-library-modify";




export const Spotify = {
    /**
     * Creates code verifier and code_challange as well as directing user to spotify authentication page
     */
    async getSpotifyAuth() {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues: Uint8Array = crypto.getRandomValues(new Uint8Array(64));
        const randomString: string = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
        const code_verifier: string = randomString;
        const data: Uint8Array= new TextEncoder().encode(code_verifier);
        const hashed: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
        const code_challenge_base64: string = btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        window.localStorage.setItem('code_verifier', code_verifier);
        const authUrl: URL = new URL(authURL)
        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: code_challenge_base64,
            redirect_uri: redirectUrl,

        };
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login

    },
    /**
     * given authorization code, returns tokens for spotify api use
     * @param code - authorization code for spotify
     * @returns - object containing access_token, refresh_token, and expires_in number
     */
    async getTokens(code: string): Promise<tokenInfo> {

        const code_verifier = localStorage.getItem('code_verifier') ?? '';
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUrl,
                code_verifier: code_verifier,
            }),
        });

        return await response.json();
    },
     /**
      *  given spotify api tokens, save them to local storage
      * @param tokens - access token, refresh token and expires_in time
      */
    saveTokens(tokens: tokenInfo) {
        const { access_token, refresh_token, expires_in } = tokens;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in.toString()); //seconds
        const now = new Date();
        const expiry = now.getTime() + expires_in * 1000; // in unix time
        localStorage.setItem('expires', expiry.toString());
    },
     // Use for every request. Call when date.now.getTime() > localstorage('expires_in)  make this a middleware statement
    async getRefreshToken () {

        // refresh token that has been previously stored
        const refreshToken = localStorage.getItem('refresh_token')?? '';
        const url = tokenEndpoint;
     
         const payload = {
           method: 'POST',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: new URLSearchParams({
             grant_type: 'refresh_token',
             refresh_token: refreshToken,
             client_id: clientId
           }),
         }
         // Add try catch for error handling
         try {
            const response = await fetch(url, payload);
            const data =  await response.json();
            localStorage.setItem('access_token', data.access_token); //double check to make sure that it isnt access_token in the response
            localStorage.setItem('refresh_token', data.refresh_token);
            
         } catch (error) {
            console.error(error);
         }
        
       },
       /**
        * 
        * @returns boolean indicating if the access token has expired
        */
    checkTokenExpiration(): boolean{
        const currentTime:number = new Date().getTime();
        const expiry:number = Number(localStorage.getItem('expires'));
        if(currentTime > expiry){
            return true
        }

        return false

    }

}

