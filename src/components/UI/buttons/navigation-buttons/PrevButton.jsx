import styles from './styles.module.css'
import { IoIosArrowBack } from "react-icons/io";

const PrevButton = (previousTrackQueryHandler) => {
    const navigationButtonState = (currentOffsetIndex = 0) => {
        if (currentOffsetIndex === 0) {
            return `${styles.track_result_navigation_button} ${styles.button_disabled}`
        }
        else {
            return `${styles.track_result_navigation_button}`
        }
    }

    const navigationIconState = (currentOffsetIndex = 0) => {
        if (currentOffsetIndex === 0) {
            return `${styles.track_result_navigation_icon} ${styles.icon_disabled}`
        }
        else {
            return `${styles.track_result_navigation_icon}`
        }
    }

    return (
        <div className={navigationButtonState()} onClick={previousTrackQueryHandler}>
            <IoIosArrowBack className={navigationIconState()} />
        </div>
    )
}

export default PrevButton
