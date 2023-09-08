import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getIngredients} from '../../services/actions/ingredients'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'

export default function IngredientDetailsPage() {
    const dispatch = useDispatch()

    const {items} = useSelector(store => store.ingredients)

    React.useEffect(() => {
        if ( items.length === 0 ) {
            dispatch(getIngredients())
        }
    }, [items, dispatch])

    return <>
        <IngredientDetails/>
    </>
}