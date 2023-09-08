import React from 'react'
import {Outlet} from 'react-router-dom'
import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar'

import styles from './profile.module.css'

export default function ProfilePage() {
    return <div className={styles.container}>
        <ProfileSidebar/>
        <Outlet/>
    </div>
}