import React from 'react'
import logo from 'images/Logo.png'

import styles from './styles.module.css'
import Button from 'components/UI/buttons/regular-buttons/Button'

import { CLIENT_ID, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPE } from 'constants/spotifyAuthConst'

const LandingPage = () => {
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=token&state=123`
    }

    const handleOpenGithubRepo = () => {
        window.open('https://github.com/haritshammam/utafy/', '_blank')
    }

    return (
        <div className={styles.page_container}>

            <header className={styles.header_container}>
                <img src={logo} alt="utafy logo" />
            </header>

            <main className={styles.main_container}>
                <h1 className={styles.main_header}>
                    Simply just a <span style={{ color: "#1DB954" }}>Spotify</span> clone with less feature.
                </h1>
                <h2 className={styles.main_subheader}>
                    Manage your spotify playlist within this third party app.
                </h2>

                <div className={styles.button_group}>
                    <Button onClick={handleLogin}>Authenticate your account</Button>
                    <Button onClick={handleOpenGithubRepo} secondaryButton>GitHub Page</Button>
                </div>
            </main>

            {/* Background Image & Blur */}
            <div className={styles.background_image_cover}></div>
            <div className={styles.background_image}></div>
        </div>
    )
}

export default LandingPage
