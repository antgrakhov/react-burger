import React, {FC, PropsWithChildren} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Modal from '../modal/modal'

type TPageInModal = {
    label?: string
}

const PageInModal: FC<PropsWithChildren<TPageInModal>> = ({label, children}) => {
    const location = useLocation()
    const navigate = useNavigate()

    function handleHide() {
        location?.state?.background && navigate(location.state.background)
    }

    return <>
        <Modal
            label={label}
            onClose={handleHide}
        >
            {children}
        </Modal>
    </>
}

export default PageInModal