import axios from 'axios'
import { spotifyActions } from 'redux/slices/spotify-slice'

export const getAlbums = (accessToken: string) => {
    return async (dispatch: Function) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://api.spotify.com/v1/me/albums",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
            dispatch(spotifyActions.appendAlbumData(res.data.items))
        }
        catch (err) {
            console.error(err)
        }
    }
}