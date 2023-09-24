import React, {FC, PropsWithChildren} from 'react'
import {createPortal} from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

import styles from './modal.module.css'

const modalRootEl = document.getElementById('root-modals')

type TModal = {
    label?: string
    onClose: () => void
}

const Modal: FC<PropsWithChildren<TModal>> = ({label, onClose, children }) => {
    function handleClose() {
        onClose()
    }

    function handleEscPressed(e: KeyboardEvent) {
        if (e.code === 'Escape') {
            onClose()
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscPressed);

        return () => {
            document.removeEventListener('keydown', handleEscPressed);
        };
    }, []) // eslint-disable-line

    return modalRootEl && createPortal(
        <div className={styles.container}>
            <ModalOverlay onClose={handleClose}/>
            <div className={styles.content}>
                <h4 className={`${styles.label} mt-4 mb-4 text_type_main-large`}>
                    {label}
                    <button className={styles.close} onClick={handleClose}>
                        <CloseIcon type="primary"/>
                    </button>
                </h4>
                {children}
            </div>
        </div>,
        modalRootEl
    )
}

export default Modal
