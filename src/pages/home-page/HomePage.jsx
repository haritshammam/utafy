import Card from 'components/UI/cards/Card'
import PageHeader from 'components/UI/typos/page-header/PageHeader'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { spotifyActions } from 'redux/slices/spotify-slice'

import styles from './styles.module.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const newReleasesData = useSelector(state => state.spotify.newReleasesData)
    const featuredPlaylistsData = useSelector(state => state.spotify.featuredPlaylistsData)

    useEffect(() => {
        dispatch(spotifyActions.clearSelectedTracks())
    }, [dispatch])

    return (
        <div className={styles.page_container}>
            <section>
                <div className={styles.header_container}>
                    <PageHeader>New Releases</PageHeader>
                </div>
                <div className={styles.albums_container}>
                    {newReleasesData && newReleasesData.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                cardData={item}
                                spotifyLink={item.external_urls.spotify}
                                subtitle={item.artists[0].name}
                            />
                        )
                    })}
                </div>
            </section>

            <section>
                <div className={styles.header_container}>
                    {featuredPlaylistsData && <PageHeader>{featuredPlaylistsData.message}</PageHeader>}
                </div>
                <div className={styles.albums_container}>
                    {featuredPlaylistsData && featuredPlaylistsData.playlists.items.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                cardData={item}
                                spotifyLink={item.external_urls.spotify}
                                subtitle={item.description}
                            />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default HomePage
