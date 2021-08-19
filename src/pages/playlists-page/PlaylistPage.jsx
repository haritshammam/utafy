import Card from 'components/UI/cards/Card'
import PageHeader from 'components/UI/typos/page-header/PageHeader'
import PageSubheader from 'components/UI/typos/page-subheader/PageSubheader'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { spotifyActions } from 'redux/slices/spotify-slice'

import styles from './styles.module.css'

const PlaylistPage = () => {
    const dispatch = useDispatch()
    const playlistsData = useSelector(state => state.spotify.playlistsData)
    const accessToken = useSelector(state => state.token.token)

    useEffect(() => {
        dispatch(spotifyActions.clearSelectedTracks())
    }, [dispatch])

    return (
        <div className={styles.page_container}>
            <div className={styles.header_container}>
                <PageHeader>Playlists</PageHeader>
                <PageSubheader>Showing {playlistsData ? playlistsData.length.toString() : '0'} result</PageSubheader>
            </div>
            <div className={styles.playlist_container}>
                {accessToken && playlistsData.map((item) => {
                    return (
                        <Card key={item.id} cardData={item} spotifyLink={item.external_urls.spotify}/>
                    )
                })}
            </div>
        </div>
    )
}

export default PlaylistPage
