import React from 'react'
import {NavLink} from 'react-router-dom'

import styles from './profile-sidebar.module.css'

export default function ProfileSidebar() {
    return <nav className={styles.nav}>
        <ul className={styles.list}>
            <li className={styles.item}>
                <NavLink
                    className={`${styles.link} text text_type_main-medium`}
                    to="/profile"
                    end
                >Профиль</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    className={`${styles.link} text text_type_main-medium`}
                    to="orders"
                >История заказов</NavLink>
            </li>
            <li className={styles.item}>
                <button
                    className={`${styles.link} ${styles.linkLogout} text text_type_main-medium`}
                    onClick={()=>console.log('logout')}
                >Выход</button>
            </li>
        </ul>

        <p className="mt-20 text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
        </p>
    </nav>
}