import {useSelector} from 'react-redux'
import {NavLink, useLocation} from 'react-router-dom'
import OrderItemIngredients from '../order-item-ingredients/order-item-ingredients'
import OrderItemTotalPrice from '../order-item-total-price/order-item-total-price'
import OrderItemDate from '../order-item-date/order-item-date'
import {ingredientsSelector} from '../../services/selectors'
import {TIngredient, TOrderData} from '../../types'

import styles from './order-item.module.css'

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

    return <li className={styles.item}>
        <NavLink
            className={styles.link}
            to={`${path}/${number}`}
            state={{background: location}}
        >
            <div className={`text text_type_digits-default`}>
                #{number}
            </div>
            <div className={styles.date}>
                <OrderItemDate dateRaw={createdAt}/>
            </div>
            <h3 className={`${styles.title} text text_type_main-medium`}>
                {name}
            </h3>
            <OrderItemIngredients
                maxViewedElements={6}
                ingredients={ingredientsData}
            />
            <OrderItemTotalPrice
                ingredientsAll={items}
                ingredientOrderIds={order.ingredients}
                classNames={styles.price}
            />
        </NavLink>
    </li>
}