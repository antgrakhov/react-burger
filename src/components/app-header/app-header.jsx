import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

const listItems = [
    {
        active: true,
        label: 'Конструктор',
        icon: <BurgerIcon type="primary"/>,
    },
    {
        active: false,
        label: 'Лента заказов',
        icon: <ListIcon type="secondary"/>,
    },
    {
        active: false,
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
                        <a
                            className={`${styles.link}${item.active ? ' ' + styles.active : ''} pl-5 pt-4 pr-5 pb-4`}
                            href="/"
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    </header>
}