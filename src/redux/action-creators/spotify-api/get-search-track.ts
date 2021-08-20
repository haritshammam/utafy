import axios from 'axios'
import { spotifyActions } from 'redux/slices/spotify-slice'

export const searchTrack = (accessToken: string, searchKeyword: string, offset: number) => {
    return async (dispatch: Function) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://api.spotify.com/v1/search",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params: {
                    q: searchKeyword,
                    type: "track",
                    limit: 6,
                    offset: offset
                }
            })
            dispatch(spotifyActions.appendTracksData(res.data.tracks.items))
        }
        catch (err) {
            console.error(err)
        }
    }
}