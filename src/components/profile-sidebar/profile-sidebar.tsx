import React from 'react'
import {NavLink} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import {logoutUserAction} from '../../services/actions/user'
import {
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
} from '../../utils/constants'
import {userSelector} from '../../services/selectors'

import styles from './profile-sidebar.module.css'

export default function ProfileSidebar() {
    const {logoutRequest} = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    function handleLogout() {
        dispatch(logoutUserAction())
    }

    return <nav className={styles.nav}>
        <ul className={styles.list}>
            <li className={styles.item}>
                <NavLink
                    className={`${styles.link} text text_type_main-medium`}
                    to={ROUTE_PROFILE}
                    end
                >Профиль</NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    className={`${styles.link} text text_type_main-medium`}
                    to={ROUTE_PROFILE_ORDERS}
                >История заказов</NavLink>
            </li>
            <li className={styles.item}>
                <button
                    className={`${styles.link} ${styles.linkLogout} text text_type_main-medium`}
                    disabled={logoutRequest}
                    onClick={handleLogout}
                >Выход</button>
            </li>
        </ul>
    </nav>
}