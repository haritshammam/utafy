import axios from 'axios'
import { spotifyActions } from 'redux/slices/spotify-slice'

export const getNewReleases = (accessToken: string) => {
    return async (dispatch: Function) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://api.spotify.com/v1/browse/new-releases",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params: {
                    limit: 6
                }
            })
            dispatch(spotifyActions.appendNewReleasesData(res.data.albums.items))
        }
        catch (err) {
            console.error(err)
        }
    }
}