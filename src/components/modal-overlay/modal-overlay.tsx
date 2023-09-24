import styles from './modal-overlay.module.css'

type TModalOverlay = {
    onClose: () => void
}

export default function ModalOverlay({onClose}: TModalOverlay) {
    return <div
        className={styles.block}
        onClick={onClose}
    />
}
