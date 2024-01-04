const authURL = "https://accounts.spotify.com/authorize?";
const baseURL = 'https://api.spotify.com/v1/';

const loginObject = {
  client_id: "ddd4cd46cead49c3ad709c3589142705",
  response_type: 'code',
  scope: "playlist-read-private playlist-modify-public playlist-modify-private user-read-email user-top-read  user-read-private user-library-modify",
  redirect_uri: 'http://localhost:3000/authorized'
}



const generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}


const Spotify = {
  async getSpotifyAuth() {
    let codeVerifier = generateRandomString(128);
    let codeChallenge = await generateCodeChallenge(codeVerifier);
    let state = generateRandomString(16);

    // the code verifier value is stored locally using the localStorage JavaScript property to be used in the next step of the authorization flow.
    localStorage.setItem('code_verifier', codeVerifier);
    loginObject.state = state;
    loginObject.code_challenge_method = 'S256';
    loginObject.code_challenge = codeChallenge;

    let loginParams = new URLSearchParams(loginObject);
    let auth_url = authURL + loginParams;

    window.location = auth_url;
  },

  async getAccessToken() {
    //POST REQUEST
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: loginObject.redirect_uri,
      client_id: loginObject.client_id,
      code_verifier: codeVerifier
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })

    if (!response.ok) {
      //throw the user an error and let them try again
      console.log('error loading data ln 82 in spotify.js');
      //fixes error from react double loading in Restrict mode
      return
    }

    const json = await response.json();
    return json;
  },

  async getUser(token) {
    //get the users profile info and their top artists in the long_term
    const userEndpoint = `${baseURL}me`;
    const artistEndpoint = `${baseURL}me/top/artists?time_range=long_term`;
    let userInfo = {};
    let artistInfo = {};
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    //add in error handlers for failed response
    const userResponse = await fetch(userEndpoint, { headers: headers });
    if(userResponse.ok){
      userInfo = await userResponse.json();
    }
    if(!userResponse.ok){
      console.log('userResponse in Spotify.js not ok');
      return
    }

    const artistResponse = await fetch(artistEndpoint,{headers:headers});
    if(artistResponse.ok){
      artistInfo = await artistResponse.json();
    }
    
    if(!artistResponse.ok){
      console.log('artistResponse in Spotify.js not ok');
      console.log(artistResponse);
      return
    }

    return {...userInfo, ...artistInfo}

  },
  
  async getTopArtists(token, time_range){
    const artistEndpoint = `${baseURL}me/top/artists?time_range=${time_range}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const artistResponse = await fetch(artistEndpoint,{headers: headers} );
    if(artistResponse.ok){
      const artistInfo = await artistResponse.json();
      return artistInfo;
    }
    if(!artistResponse.ok){
      console.log(artistResponse.statusText);
    }
  },

  async getTopTracks(token, time_range){
    const tracksEndpoint = `${baseURL}me/top/tracks?time_range=${time_range}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const tracksResponse = await fetch(tracksEndpoint,{headers: headers} );
    if(tracksResponse.ok){
      const tracksInfo = await tracksResponse.json();
      return tracksInfo;
    }
    if(!tracksResponse.ok){
      console.log(tracksResponse.statusText);
    }
  }

}


export default Spotify;

