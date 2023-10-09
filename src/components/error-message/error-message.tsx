import styles from './error-message.module.css'

type TErrorMessage = {
    title: string
    message: string
}

export default function ErrorMessage({title, message}: TErrorMessage) {
    return <div className={styles.container}>
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
}