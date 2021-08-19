import { useSelector, useDispatch } from 'react-redux'

import UserProfile from 'components/UI/user-profile/UserProfile'
import styles from './styles.module.css'

import { uiActions } from 'redux/slices/ui-slice'

import { BiMenu, BiX } from 'react-icons/bi'
import SideNav from 'components/UI/sidenavs/SideNav'

const Navbar = () => {
    const dispatch = useDispatch()

    const isMenuClicked = useSelector(state => state.ui.isMenuClicked)
    const accessToken = useSelector(state => state.token.token)
    const userData = useSelector(state => state.spotify.userData)

    return (
        <div className={styles.navbar_container}>

            {isMenuClicked ?
                <BiX
                    className={styles.menu_button}
                    onClick={() => { dispatch(uiActions.setIsMenuClicked()) }}
                />
                :
                <BiMenu
                    className={styles.menu_button}
                    onClick={() => { dispatch(uiActions.setIsMenuClicked()) }}
                />
            }

            <SideNav />

            <div className={styles.profile_container}>
                {(accessToken && userData) && <UserProfile userData={userData} />}
            </div>
        </div>
    )
}

export default Navbar
