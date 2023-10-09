import {useCallback, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import {feedOrdersSelector} from '../../services/selectors'
import OrderItem from '../../components/order-item/order-item'
import ErrorMessage from '../../components/error-message/error-message'
import Loader from '../../components/loader/loader'
import {formattedNumber} from '../../utils/formatted-number'
import {
    PATH_WS_API_ORDERS_ALL,
    ROUTE_FEED,
} from '../../utils/constants'
import {
    OrderStatusTypes,
    TOrderData
} from '../../types'
import {
    FEED_ORDERS_CONNECTION_START,
    FEED_ORDERS_CONNECTION_STOP
} from '../../services/actions/feed-orders'

import styles from './feed.module.css'

export default function FeedPage() {
    const maxShowOrdersNum = 5
    const dispatch = useAppDispatch()
    const {
        orders,
        total,
        totalToday,
        wsConnected,
        error,
    } = useAppSelector(feedOrdersSelector)

    const boardListByType = useCallback((statusType: OrderStatusTypes) => {
        const ordersByStatus = orders.filter(order => order.status === statusType)
        const ordersSliced = ordersByStatus.slice(0, maxShowOrdersNum)
        let ordersNumbers = ordersSliced.map(order => order.number.toString())

        if (ordersByStatus.length > maxShowOrdersNum) {
            ordersNumbers.push('…')
        }

        return ordersNumbers
    }, [orders])

    const boardList = [
        {
            title: 'Готовы:',
            items: boardListByType(OrderStatusTypes.Done),
        },
        {
            title: 'В работе:',
            items: boardListByType(OrderStatusTypes.Pending),
        }
    ]

    useEffect(() => {
        dispatch({
            type: FEED_ORDERS_CONNECTION_START,
            payload: PATH_WS_API_ORDERS_ALL
        })

        return () => {
            dispatch({
                type: FEED_ORDERS_CONNECTION_STOP
            })
        }
    }, [dispatch])

    return <>
        {!error && orders.length > 0 &&
            <>
                <section className={styles.lenta}>
                    <h1 className={styles.title}>Лента заказов</h1>
                    <div className={styles.wrap}>
                        <ul className={`${styles.list} custom-scroll`}>
                            {orders.map((order: TOrderData, index: number) =>
                                <OrderItem
                                    key={index}
                                    order={order}
                                    path={ROUTE_FEED}
                                />
                            )}
                        </ul>
                    </div>
                </section>

                <section className={styles.info}>
                    <div className={styles.boardList}>
                        {boardList.map((board, boardIndex) =>
                            <div key={boardIndex} className={styles.board}>
                                <h2 className={`${styles.boardTitle} text text_type_main-medium`}>
                                    {board.title}
                                </h2>
                                <ul className={styles.boardNumList}>
                                    {board.items.length > 0 && board.items.map((item, index) =>
                                        <li
                                            key={index}
                                            className={`${styles.boardNum} ${boardIndex === 0 ? styles.boardNumSuccess : ''} text text_type_digits-default`}
                                        >
                                            {item}
                                        </li>
                                    )}
                                    {board.items.length === 0 &&
                                        <li className={`${styles.boardNum} ${boardIndex === 0 ? styles.boardNumSuccess : ''} text text_type_digits-default`}>
                                            —
                                        </li>
                                    }
                                </ul>
                            </div>
                        )}
                    </div>

                    <h2 className={`${styles.infoTitle} text text_type_main-medium`}>Выполнено за все время:</h2>

                    <p className="digits-with-shadow text_type_digits-large">
                        {formattedNumber(total)}
                    </p>

                    <h2 className={`${styles.infoTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>

                    <p className="digits-with-shadow text_type_digits-large">
                        {formattedNumber(totalToday)}
                    </p>
                </section>
            </>
        }
        {!error && orders.length === 0 && <Loader/>}
        {!error && wsConnected && orders.length === 0 &&
            <p>Заказы отсутствуют</p>
        }
        {error &&
            <ErrorMessage
                title={`Возникла непредвиденная ошибка`}
                message={`Попробуйте перезагрузить страницу`}
            />
        }
    </>
}