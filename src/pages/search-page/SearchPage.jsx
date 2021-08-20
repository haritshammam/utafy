import { useState } from 'react'
import Card from 'components/UI/cards/Card'
import PageHeader from 'components/UI/typos/page-header/PageHeader'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { spotifyActions } from 'redux/slices/spotify-slice'
import { searchTrack } from 'redux/action-creators/spotify-api/get-search-track'

import styles from './styles.module.css'

const AlbumsPage = () => {
    const dispatch = useDispatch()
    const tracksData = useSelector(state => state.spotify.tracksData)
    const accessToken = useSelector(state => state.token.token)

    const [searchKeyword, setSearchKeyword] = useState()
    const [currentOffsetIndex, setCurrentOffsetIndex] = useState(0)

    const handleSearchTracks = (offset) => {
        setCurrentOffsetIndex(0)
        if (searchKeyword) {
            dispatch(searchTrack(accessToken, searchKeyword, offset))
        }
    }

    const handleNextTrackQuery = () => {
        if (currentOffsetIndex < 1000 && currentOffsetIndex >= 0) {
            handleSearchTracks(currentOffsetIndex + 6)
            setCurrentOffsetIndex(currentOffsetIndex + 6)
            console.log(currentOffsetIndex)
        }
    }

    const handlePreviousTrackQuery = () => {
        if (currentOffsetIndex >= 6) {
            handleSearchTracks(currentOffsetIndex - 6)
            setCurrentOffsetIndex(currentOffsetIndex - 6)
            console.log(currentOffsetIndex)
        }
    }

    const navigationButtonState = () => {
        if (currentOffsetIndex === 0) {
            return `${styles.track_result_navigation_button} ${styles.button_disabled}`
        }
        else {
            return `${styles.track_result_navigation_button}`
        }
    }

    const navigationIconState = () => {
        if (currentOffsetIndex === 0) {
            return `${styles.track_result_navigation_icon} ${styles.icon_disabled}`
        }
        else {
            return `${styles.track_result_navigation_icon}`
        }
    }

    useEffect(() => {
        dispatch(spotifyActions.clearSelectedTracks())
    }, [dispatch])

    return (
        <div className={styles.page_container}>
            <div className={styles.header_container}>
                <PageHeader>Search</PageHeader>
            </div>

            <div className={styles.field_container}>
                <label htmlFor="songList" className={styles.label}>Songs</label>
                <input
                    className={styles.input}
                    id="songList"
                    name="songList"
                    type="text"
                    placeholder="Search your songs here"
                    onChange={(e) => {
                        setSearchKeyword(e.target.value.replace(" ", "+"))
                        handleSearchTracks()
                    }}
                />
            </div>

            {tracksData && (
                <div className={styles.track_result_navigation_container}>
                    <div className={navigationButtonState()} onClick={handlePreviousTrackQuery}>
                        <IoIosArrowBack className={navigationIconState()} />
                    </div>
                    <div className={styles.track_result_navigation_button} onClick={handleNextTrackQuery}>
                        <IoIosArrowForward className={styles.track_result_navigation_icon} />
                    </div>
                </div>
            )}

            <div className={styles.albums_container}>
                {tracksData && tracksData.map((item) => {
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
