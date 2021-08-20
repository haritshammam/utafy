import axios from 'axios'
import { spotifyActions } from 'redux/slices/spotify-slice'

export const getFeaturedPlaylists = (accessToken: string) => {
    return async (dispatch: Function) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://api.spotify.com/v1/browse/featured-playlists",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params: {
                    limit: 6,
                    country: 'ID'
                }
            })
            dispatch(spotifyActions.appendFeaturedPlaylistsData(res.data))
        }
        catch (err) {
            console.error(err)
        }
    }
}