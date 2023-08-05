import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'

const listItems = [
    {
        type: 'href',
        active: true,
        label: 'Конструктор',
        icon: <BurgerIcon type="primary"/>,
    },
    {
        type: 'href',
        active: false,
        label: 'Лента заказов',
        icon: <ListIcon type="secondary"/>,
    },
    {
        type: 'logo',
        label: <Logo/>,
    },
    {
        type: 'href',
        active: false,
        label: 'Личный кабинет',
        icon: <ProfileIcon type="secondary"/>,
    },
]

export default function AppHeader() {
    return <header className={styles.container}>
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {listItems.map((item, index) =>
                    <li
                        key={index}
                        className={`${styles.item} ${styles[item.type]}`}
                    >
                        {item.type === 'href' &&
                            <a
                                className={`${styles.link} pl-5 pt-4 pr-5 pb-4`}
                                href={item.active ? '/' : null}
                            >
                                {item.icon}
                                {item.label}
                            </a>
                        }

                        {item.type !== 'href' && <>
                            {item.label}
                        </>}
                    </li>
                )}
            </ul>
        </nav>
    </header>
}