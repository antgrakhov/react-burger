import {useMemo} from 'react'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {TIngredient} from '../../types'
import getTotalPrice from '../../utils/total-price'

type TOrderItemTotalPrice = {
    ingredientsAll: TIngredient[]
    ingredientOrderIds: string[]
    classNames?: string
}

export default function OrderItemTotalPrice({ingredientsAll, ingredientOrderIds, classNames}: TOrderItemTotalPrice) {
    const totalPrice = useMemo(() => {
        let ingredientsList: TIngredient[] = []

        ingredientOrderIds.forEach(ingredientId => {
            ingredientsList.push(
                ingredientsAll.find((ingredient: TIngredient) => ingredient._id === ingredientId) as TIngredient
            )
        })

        return getTotalPrice(ingredientsList)
    }, [ingredientOrderIds, ingredientsAll])

    return <div className={`${classNames} text_type_digits-default`}>
        {totalPrice}
        <CurrencyIcon type="primary"/>
    </div>
}