import {NavLink} from 'react-router-dom'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {
    ROUTE_FEED,
    ROUTE_INDEX,
    ROUTE_PROFILE,
} from '../../utils/constants'

import styles from './app-header.module.css'

const listItems = [
    {
        active: true,
        label: 'Конструктор',
        to: ROUTE_INDEX,
        icon: <BurgerIcon type="secondary"/>,
    },
    {
        active: false,
        to: ROUTE_FEED,
        label: 'Лента заказов',
        icon: <ListIcon type="secondary"/>,
    },
    {
        active: false,
        to: ROUTE_PROFILE,
        label: 'Личный кабинет',
        icon: <ProfileIcon type="secondary"/>,
    },
]

export default function AppHeader() {
    return <header className={styles.container}>
        <div className={styles.logo}>
            <NavLink to={ROUTE_INDEX}>
                <Logo/>
            </NavLink>
        </div>

        <nav className={styles.nav}>
            <ul className={styles.list}>
                {listItems.map((item, index: number) =>
                    <li
                        key={index}
                        className={`${styles.item}`}
                    >
                        <NavLink
                            className={`${styles.link} pl-5 pt-4 pr-5 pb-4`}
                            to={item.to}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    </header>
}