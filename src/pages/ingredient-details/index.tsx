import React, {Dispatch} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getIngredients} from '../../services/actions/ingredients'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import {ingredientsSelector} from '../../services/selectors'

export default function IngredientDetailsPage() {
    const dispatch: Dispatch<any> = useDispatch()

    const {items} = useSelector(ingredientsSelector)

    React.useEffect(() => {
        if (items.length === 0) {
            dispatch(getIngredients())
        }
    }, [items, dispatch])

    return <IngredientDetails/>
}