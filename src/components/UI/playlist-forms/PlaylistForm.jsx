import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPlaylist, spotifyActions } from 'redux/slices/spotify-slice'
import { searchTrack } from 'redux/action-creators/spotify-api/search-track'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import Button from 'components/UI/buttons/Button'
import TrackCard from 'components/UI/cards/TrackCard'
import styles from './styles.module.css'

const NewPlaylistForm = () => {

    const [searchKeyword, setSearchKeyword] = useState()
    const [currentOffsetIndex, setCurrentOffsetIndex] = useState(0)
    const [selectedTracks, setSelectedTracks] = useState([])
    const [newPlaylistForm, setnewPlaylistForm] = useState({
        playlistTitle: '',
        playlistDescription: ''
    })

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.token.token)
    const tracksData = useSelector(state => state.spotify.tracksData)

    const handleSearchTracks = (offset) => {
        if (selectedTracks) {
            setCurrentOffsetIndex(0)
        }
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

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        setnewPlaylistForm({});
        setSearchKeyword()
        setSelectedTracks([])
        setCurrentOffsetIndex(0)
        dispatch(spotifyActions.clearSelectedTracks())
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // To get select track button state
    const getSelectTrackButtonState = (uri) => {
        let status = false;
        for (let i = 0; i < selectedTracks.length; i++) {
            if (selectedTracks[i] === uri) {
                status = true
            }
        }
        return status;
    }

    const pushToSelectedTracks = (uri) => {
        const currentList = selectedTracks;
        currentList.push(uri);
        setSelectedTracks(currentList);
    }

    const deleteFromSelectedTracks = (uri) => {
        const currentList = selectedTracks;
        for (var i = 0; i < selectedTracks.length; i++) {
            if (selectedTracks[i] === uri) {
                currentList.splice(i, 1);
            }
        }
        setSelectedTracks(currentList);
    }


    // To handle submit new playlist form
    const handleSubmitNewPlaylistForm = e => {
        e.preventDefault()
        if (selectedTracks.length === 0) {
            alert("No selected playlist")
            return
        }
        else {
            dispatch(createPlaylist(newPlaylistForm, accessToken, selectedTracks))
            handleReset()
            alert("Playlist Created")
        }
    }

    // To handle input change of New Playlist form
    const handleChangeNewPlaylistInput = e => {
        setnewPlaylistForm({ ...newPlaylistForm, [e.target.name]: e.target.value })
    }

    const navigationIconState = () => {
        if (currentOffsetIndex === 0) {
            return `${styles.track_result_navigation_icon} ${styles.icon_disabled}`
        }
        else {
            return `${styles.track_result_navigation_icon}`
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

    return (
        <div>
            <form onSubmit={handleSubmitNewPlaylistForm} className={styles.form}>
                <h2 className={styles.header}>Create new playlist</h2>
                <div className={styles.field_container}>
                    <label htmlFor="playlistTitle" className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        id="playlistTitle"
                        name="playlistTitle"
                        type="text"
                        placeholder="My Playlist #1"
                        minLength="5"
                        value={newPlaylistForm.playlistTitle}
                        onChange={handleChangeNewPlaylistInput}
                        required />
                </div>

                <div className={styles.field_container}>
                    <label htmlFor="playlistDescription" className={styles.label}>Short Description</label>
                    <input
                        className={styles.input}
                        id="playlistDescription"
                        name="playlistDescription"
                        type="text"
                        placeholder="My Playlist description"
                        minLength="10"
                        value={newPlaylistForm.playlistDescription}
                        onChange={handleChangeNewPlaylistInput}
                        required />
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


                {tracksData && <p className={styles.text_small}>Select songs you want to add</p>}

                <div className={styles.track_card_list_container}>
                    {tracksData && tracksData.map((track) => {
                        const buttonState = getSelectTrackButtonState(track.uri)
                        return (
                            <TrackCard
                                key={track.id}
                                trackData={track}
                                buttonState={buttonState}
                                pushToSelectedTracks={pushToSelectedTracks}
                                deleteFromSelectedTracks={deleteFromSelectedTracks}
                            />
                        )
                    })}
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

                <Button type="submit">Create playlist</Button>

            </form>
        </div>
    )
}

export default NewPlaylistForm
