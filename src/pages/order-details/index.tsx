import {useMemo} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {useAppSelector} from '../../utils/store'
import OrderDetailsIngredients from '../../components/order-details-ingredients/order-details-ingredients'
import OrderItemTotalPrice from '../../components/order-item-total-price/order-item-total-price'
import OrderItemDate from '../../components/order-item-date/order-item-date'
import {feedOrdersSelector, ingredientsSelector} from '../../services/selectors'
import {
    TIngredient,
    TOrderIngredient
} from '../../types'

import styles from './order-details.module.css'
import Loader from "../../components/loader/loader";

type TOrderDetailsPage = {
    embed?: boolean
}

enum OrderStatusLabels {
    created = 'Создан',
    pending = 'В работе',
    done = 'Выполнен',
}

export default function OrderDetailsPage({embed}: TOrderDetailsPage) {
    const {id} = useParams()
    // const location = useLocation()
    const {items} = useAppSelector(ingredientsSelector)
    const {orders} = useAppSelector(feedOrdersSelector)
    const order = orders.find(order => order.number === Number(id))
    const orderStatus = order
        ? order.status
        : 'pending'

    const isEmbedStyle = embed ? ' ' + styles.embed : ''
    // const isFeed = location.pathname.includes(ROUTE_FEED)

    const ingredientsData = useMemo(() => {
        let data: TOrderIngredient[] = []

        if ( order && order.ingredients.length > 0 ) {
            order.ingredients.forEach(ingredientId => {
                const hasIngredientIndex = data.findIndex((item: TOrderIngredient) => item.ingredient._id === ingredientId)

                if ( hasIngredientIndex > -1 ) {
                    data[hasIngredientIndex].quantity += 1
                } else {
                    data.push({
                        ingredient: items.find(
                            (item: TIngredient) => item._id === ingredientId
                        ),
                        quantity: 1
                    })
                }
            })
        }

        return data
    }, [order, items])

    return <>
        {order && <div className={`${styles.container}${isEmbedStyle}`}>
            {order && <>
                <div className={`${styles.num} text text_type_digits-default`}>
                    #{id}
                </div>
                <h1 className={`${styles.title} text text_type_main-medium`}>
                    {order.name}
                </h1>
                <div className={`${styles.status} _done`}>
                    {OrderStatusLabels[orderStatus]}
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
            </>}
        </div>}
        {!order && <Loader/>}
    </>
}