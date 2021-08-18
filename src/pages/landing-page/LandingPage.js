import React from 'react'
import logo from 'images/Logo.png'

import styles from './styles.module.css'
import Button from 'components/UI/buttons/Button'

const LandingPage = () => {
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
                    <Button>Authenticate your account</Button>
                    <Button secondaryButton>GitHub Page</Button>
                </div>
            </main>
            <div className={styles.background_image_cover}></div>
            <div className={styles.background_image}></div>
        </div>
    )
}

export default LandingPage
