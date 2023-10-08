import {useSelector} from 'react-redux'
import {NavLink, useLocation} from 'react-router-dom'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderItemIngredients from '../order-item-ingredients/order-item-ingredients'
import {ingredientsSelector} from '../../services/selectors'
import {TIngredient, TOrderData} from '../../types'

import styles from './order-item.module.css'
import {useMemo} from "react";
import getTotalPrice from "../../utils/totalPrice";

type TOrderItem = {
    order: TOrderData
    path: string
}

export default function OrderItem({order, path}: TOrderItem) {
    const location = useLocation()

    const {
        name,
        number,
        ingredients,
        createdAt
    } = order

    const {items} = useSelector(ingredientsSelector)
    const ingredientsData = items.filter((item: TIngredient) =>
        ingredients.includes(item._id)
    )

    const totalPrice = useMemo(() => {
        return getTotalPrice(ingredientsData)
    }, [ingredientsData])

    return <li className={styles.item}>
        <NavLink
            className={styles.link}
            to={`${path}/${number}`}
            state={{background: location}}
        >
            <div className={`text text_type_digits-default`}>
                #{number}
            </div>
            <div className={`${styles.date} text_color_inactive`}>
                {createdAt}
            </div>
            <h3 className={`${styles.title} text text_type_main-medium`}>
                {name}
            </h3>
            <OrderItemIngredients
                maxViewedElements={6}
                ingredients={ingredientsData}
            />
            <div className={`${styles.price} text_type_digits-default`}>
                {totalPrice}
                <CurrencyIcon type="primary"/>
            </div>
        </NavLink>
    </li>
}