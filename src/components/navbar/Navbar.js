import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import UserProfile from 'components/UI/user-profile/UserProfile'
import styles from './styles.module.css'

import { BiMenu, BiX } from 'react-icons/bi'

const Navbar = () => {

    const accessToken = useSelector(state => state.token.token)
    const userData = useSelector(state => state.spotify.userData)

    const [sidebar, setSidebar] = useState(false);

    return (
        <div className={styles.navbar_container}>

            {sidebar ?
                <BiX className={styles.menu_button} onClick={() => { setSidebar(false) }} />
                :
                <BiMenu className={styles.menu_button} onClick={() => { setSidebar(true) }} />
            }

            <div className={styles.profile_container}>
                {(accessToken && userData) && <UserProfile userData={userData} />}
            </div>
        </div>
    )
}

export default Navbar
