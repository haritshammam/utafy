import styles from './styles.module.css'

const Card = ({cardData, spotifyLink, subtitle}) => {
    return (
        <div
            className={styles.card_container}
            onClick={() => {
                window.open(spotifyLink, '_blank')
            }}
        >
            <img
                src={cardData.images[0].url}
                alt="playlist cover"
                className={styles.card_image}
            />
            <div className={styles.card_info}>
                <p className={styles.card_title}>{cardData.name}</p>
                <p className={styles.card_subtitle}>{subtitle}</p>
            </div>
            <div className={styles.card_info_background}></div>
        </div>

    )
}

export default Card
