import styles from './404.module.css'

export default function Page404() {
    return <div className={styles.outer}>
        <h1>Ошибка 404. Ничего не найдено</h1>
        <p>К сожалению, по этому адресу ничего нет.</p>
    </div>
}