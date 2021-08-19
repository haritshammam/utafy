import React from 'react'
import { useDispatch } from 'react-redux'

import { tokenActions } from 'redux/slices/token-slice'

import styles from './styles.module.css'

import { BiUser } from "react-icons/bi";
import { FiGithub, FiLogOut } from "react-icons/fi";

const UserProfile = ({ userData }) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(tokenActions.emptyToken())
    }

    const accountUrl = "https://www.spotify.com/id/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
    const githubRepoUrl = "https://www.github.com/haritshammam/utafy"

    return (
        <div className={styles.container}>
            <div className={styles.user_profile_container}>
                <img src={userData.images[0].url} alt="User Profile" className={styles.display_picture} />
                <p className={styles.display_name}>{userData.display_name}</p>
            </div>
            <div className={styles.dropdown_content_padding}>
                <div className={styles.dropdown_content}>
                    <div className={styles.dropdown_item}>
                        <BiUser className={styles.dropdown_item_icon}/>
                        <a className={styles.drowdown_content_link} href={accountUrl} target='_blank' rel='noreferrer'>Account</a>
                    </div>
                    <div className={styles.dropdown_item}>
                        <FiGithub className={styles.dropdown_item_icon}/>
                        <a className={styles.drowdown_content_link} href={githubRepoUrl} target='_blank' rel='noreferrer'>Github Repo</a>
                    </div>
                    <div onClick={handleLogout} className={styles.dropdown_item}>
                        <FiLogOut className={styles.dropdown_item_icon_red}/>
                        <span className={styles.dropdown_content_logout}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
