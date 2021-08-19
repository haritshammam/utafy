import styles from './styles.module.css'

import NewPlaylistForm from 'components/UI/playlist-forms/PlaylistForm'

const CreatePlaylist = () => {
    return (
        <div className={styles.page_container}>
            <NewPlaylistForm />
        </div>
    )
}

export default CreatePlaylist
