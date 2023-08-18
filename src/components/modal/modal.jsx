import React from 'react'
import {createPortal} from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from 'prop-types'

import styles from './modal.module.css'

const modalRootEl = document.getElementById('root-modals')

export default function Modal({children, label, onClose}) {
    function handleClose(e) {
        e.stopPropagation()
        onClose()
    }

    function handleEscPressed(e) {
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
                <h4 className={`${styles.label} text_type_main-large`}>
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

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    onClose: PropTypes.func.isRequired
}