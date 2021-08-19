import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiHomeAlt, BiSearch, BiAlbum } from "react-icons/bi"
import { RiPlayListLine } from "react-icons/ri"
import { CgAddR } from "react-icons/cg"

import styles from './styles.module.css'

import logo from 'images/Logo.png'
import { uiActions } from 'redux/slices/ui-slice'

const SideNav = () => {
    const dispatch = useDispatch()
    const isMenuClicked = useSelector(state => state.ui.isMenuClicked)

    const sideNavItems = [
        {
            link: "/home",
            icon: <BiHomeAlt className={styles.nav_list_icon} />,
            text: "Home"
        },
        {
            link: "/search",
            icon: <BiSearch className={styles.nav_list_icon} />,
            text: "Search"
        },
        {
            link: "/Playlists",
            icon: <RiPlayListLine className={styles.nav_list_icon} />,
            text: "Playlists"
        },
        {
            link: "/albums",
            icon: <BiAlbum className={styles.nav_list_icon} />,
            text: "Albums"
        },
        {
            link: "/create-playlist",
            icon: <CgAddR className={styles.nav_list_icon} />,
            text: "Create Playlist"
        }
    ]

    return (
        <div>
            <nav className={!isMenuClicked ? `${styles.nav_menu}` : `${styles.nav_menu} ${styles.nav_menu_active}`}>
                <div className={styles.nav_logo}>
                    <img src={logo} alt="utafy logo" className={styles.logo} />
                </div>
                <ul className={styles.nav_container} onClick={() => { dispatch(uiActions.setIsMenuClicked()) }}>
                    {sideNavItems.map((item) => {
                        return (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className={
                                        (window.location.pathname === item.link) ?
                                            `${styles.nav_list_container} ${styles.nav_list_container_selected}` :
                                            `${styles.nav_list_container}`
                                    }
                                >
                                    {item.icon}
                                    <p className={styles.nav_list_text}>{item.text}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default SideNav
