import Card from 'components/UI/cards/Card'
import PageHeader from 'components/UI/typos/page-header/PageHeader'
import PageSubheader from 'components/UI/typos/page-subheader/PageSubheader'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { spotifyActions } from 'redux/slices/spotify-slice'

import styles from './styles.module.css'

const AlbumsPage = () => {
    const dispatch = useDispatch()
    const albumsData = useSelector(state => state.spotify.albumsData)

    useEffect(() => {
        dispatch(spotifyActions.clearSelectedTracks())
    }, [dispatch])

    return (
        <div className={styles.page_container}>
            <div className={styles.header_container}>
                <PageHeader>Albums</PageHeader>
                <PageSubheader>Showing {albumsData ? albumsData.length.toString() : '0'} result</PageSubheader>
            </div>
            <div className={styles.albums_container}>
                {albumsData && albumsData.map((item) => {
                    return (
                        <Card
                            key={item.album.id}
                            cardData={item.album}
                            spotifyLink={item.album.external_urls.spotify}
                            subtitle={item.album.artists[0].name}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default AlbumsPage
