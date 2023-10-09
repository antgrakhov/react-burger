import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import OrderItem from '../order-item/order-item'
import Loader from '../loader/loader'
import ErrorMessage from '../error-message/error-message'
import {getCookie} from '../../utils/cookies'
import {
    HISTORY_ORDERS_CONNECTION_START,
    HISTORY_ORDERS_CONNECTION_STOP
} from '../../services/actions/history-orders'
import {historyOrdersSelector} from '../../services/selectors'
import {
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
    WS_API_URL,
} from '../../utils/constants'
import {TOrderData} from '../../types'

import styles from './profile-orders.module.css'

export default function ProfileOrders() {
    const dispatch = useAppDispatch()

    const {
        orders,
        wsConnected,
        error,
    } = useAppSelector(historyOrdersSelector)

    useEffect(() => {
        dispatch({
            type: HISTORY_ORDERS_CONNECTION_START,
            payload: `${WS_API_URL}/orders?token=${getCookie('accessToken')}`
        })

        return () => {
            dispatch({
                type: HISTORY_ORDERS_CONNECTION_STOP
            })
        }
    }, [dispatch])

    const path = `${ROUTE_PROFILE}/${ROUTE_PROFILE_ORDERS}`

    return <>
        {!error && orders.length > 0 &&
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <ul className={`${styles.list} custom-scroll`}>
                        {orders.map((order: TOrderData, index: number) =>
                            <OrderItem
                                key={index}
                                order={order}
                                path={path}
                            />
                        )}
                    </ul>
                </div>
            </div>
        }
        {!error && !wsConnected && <Loader/>}
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