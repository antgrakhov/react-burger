import {useEffect, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import OrderDetailsIngredients from '../../components/order-details-ingredients/order-details-ingredients'
import OrderItemTotalPrice from '../../components/order-item-total-price/order-item-total-price'
import OrderItemDate from '../../components/order-item-date/order-item-date'
import {getOrder} from '../../services/actions/order-view'
import Loader from '../../components/loader/loader'
import Page404 from '../404'
import {orderViewSelector, ingredientsSelector} from '../../services/selectors'
import {
    TIngredient,
    TOrderIngredient
} from '../../types'

import styles from './order-details.module.css'

type TOrderDetailsPage = {
    embed?: boolean
}

enum OrderStatusLabels {
    created = 'Создан',
    pending = 'В работе',
    done = 'Выполнен',
}

export default function OrderDetailsPage({embed}: TOrderDetailsPage) {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {items} = useAppSelector(ingredientsSelector)
    const {
        orders,
        orderViewRequest,
        orderViewFailed
    } = useAppSelector(orderViewSelector)

    const isEmbedStyle = embed ? ' ' + styles.embed : ''

    const order = orders.length > 0
        ? orders[0]
        : null

    const ingredientsData = useMemo(() => {
        let data: TOrderIngredient[] = []

        if (order) {
            order.ingredients.forEach(ingredientId => {
                const hasIngredientIndex = data.findIndex((item: TOrderIngredient) => item.ingredient._id === ingredientId)

                if ( hasIngredientIndex > -1 ) {
                    data[hasIngredientIndex].quantity += 1
                } else {
                    const newIngredient = items.find(
                        (item: TIngredient) => item._id === ingredientId
                    )

                    if (newIngredient) {
                        data.push({
                            ingredient: newIngredient,
                            quantity: 1
                        })
                    }
                }
            })
        }

        return data
    }, [order, items])

    useEffect(() => {
        dispatch(getOrder(id))
    }, [id, dispatch])

    return <>
        {!orderViewRequest && !orderViewFailed && order &&
            <div key={order._id} className={`${styles.container}${isEmbedStyle}`}>
                <div className={`${styles.num} text text_type_digits-default`}>
                    #{id}
                </div>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    {order.name}
                </h1>
                <div className={`${styles.status} _done`}>
                    {OrderStatusLabels[order.status]}
                </div>
                <h2 className={`${styles.subtitle} text text_type_main-medium`}>
                    Состав:
                </h2>
                <div className={styles.listWrap}>
                    <ul className={`${styles.list} custom-scroll`}>
                        {ingredientsData.map((item: TOrderIngredient, index: number) =>
                            <OrderDetailsIngredients
                                key={index}
                                item={item}
                                quantity={1}
                            />
                        )}
                    </ul>
                </div>
                <div className={styles.meta}>
                    <div className={styles.date}>
                        <OrderItemDate dateRaw={order.createdAt}/>
                    </div>
                    <OrderItemTotalPrice
                        ingredientsAll={items}
                        ingredientOrderIds={order.ingredients}
                        classNames={styles.price}
                    />
                </div>
            </div>
        }
        {orderViewRequest && <Loader/>}
        {orderViewFailed && <Page404/>}
    </>
}