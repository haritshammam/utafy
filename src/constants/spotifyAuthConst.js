const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const SCOPE = "playlist-modify-private playlist-read-private user-read-private user-library-read user-library-modify"
const REDIRECT_URL_AFTER_LOGIN =
    process.env.NODE_ENV === 'development' ?
        "http://localhost:3000/" :
        "http://utafymusic.vercel.app/"

export {
    CLIENT_ID,
    SPOTIFY_AUTHORIZE_ENDPOINT,
    REDIRECT_URL_AFTER_LOGIN,
    SCOPE
}