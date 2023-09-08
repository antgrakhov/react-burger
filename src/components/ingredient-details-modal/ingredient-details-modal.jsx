import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'

export default function IngredientDetailsModal() {
    const location = useLocation()
    const navigate = useNavigate()

    function handleHideIngredientDetails() {
        location?.state?.background && navigate(location.state.background)
    }

    return <>
        <Modal
            label="Детали ингредиента"
            onClose={handleHideIngredientDetails}
        >
            <IngredientDetails embed={true}/>
        </Modal>
    </>
}