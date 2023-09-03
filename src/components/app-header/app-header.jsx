import {NavLink} from 'react-router-dom'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

const listItems = [
    {
        active: true,
        label: 'Конструктор',
        to: '/',
        icon: <BurgerIcon type="secondary"/>,
    },
    {
        active: false,
        to: '/lenta',
        label: 'Лента заказов',
        icon: <ListIcon type="secondary"/>,
    },
    {
        active: false,
        to: '/profile',
        label: 'Личный кабинет',
        icon: <ProfileIcon type="secondary"/>,
    },
]

export default function AppHeader() {
    return <header className={styles.container}>
        <div className={styles.logo}>
            <Logo/>
        </div>

        <nav className={styles.nav}>
            <ul className={styles.list}>
                {listItems.map((item, index) =>
                    <li
                        key={index}
                        className={`${styles.item}`}
                    >
                        <NavLink
                            className={`${styles.link}${item.active ? ' ' + styles.active : ''} pl-5 pt-4 pr-5 pb-4`}
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