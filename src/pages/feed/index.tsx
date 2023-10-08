import {useEffect, useMemo} from 'react'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import {feedOrdersSelector} from '../../services/selectors'
import OrderItem from '../../components/order-item/order-item'
import {ROUTE_FEED} from '../../utils/constants'
import {WS_API_URL} from '../../utils/constants'
import {TOrderData} from '../../types'
import {
    FEED_ORDERS_CONNECTION_START,
    FEED_ORDERS_CONNECTION_STOP
} from '../../services/actions/feed-orders'

import styles from './feed.module.css'





const boardListReady = [
    '034533',
    '034532',
    '034530',
    '034527',
    '034525',
]
const boardListWork = [
    '034538',
    '034541',
    '034542',
]
const boards = [
    {
        title: 'Готовы:',
        items: boardListReady,
    },
    {
        title: 'В работе:',
        items: boardListWork,
    }
]

export default function FeedPage() {
    const {
        orders,
        total,
        totalToday,
        error,
        wsConnected
    } = useAppSelector(feedOrdersSelector)
    const formattedNum = (num: string | number) => Number(num).toLocaleString('ru')

    const dispatch = useAppDispatch()



    const loadedOrders = useMemo(() => {
        return orders ? orders : [];
    }, [orders])

    return <>
        <section className={styles.lenta}>
            <h1 className={styles.title}>Лента заказов</h1>
            <div className={styles.wrap}>
                {loadedOrders.length > 0 &&
                    <ul className={`${styles.list} custom-scroll`}>
                        {loadedOrders.map((order: TOrderData, index: number) =>
                            <OrderItem
                                key={index}
                                order={order}
                                path={ROUTE_FEED}
                            />
                        )}
                    </ul>
                }
            </div>
        </section>

        <section className={styles.info}>
            <div className={styles.boardList}>
                {boards.map((board, boardIndex) =>
                    <div key={boardIndex} className={styles.board}>
                        <h2 className={`${styles.boardTitle} text text_type_main-medium`}>{board.title}</h2>
                        <ul className={styles.boardNumList}>
                            {board.items.map((item, index) =>
                                <li
                                    key={index}
                                    className={`${styles.boardNum} ${boardIndex === 0 ? styles.boardNumSuccess : ''} text text_type_digits-default`}
                                >
                                    {item}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <h2 className={`${styles.infoTitle} text text_type_main-medium`}>Выполнено за все время:</h2>
            <p className="digits-with-shadow text_type_digits-large">
                {formattedNum(total)}
            </p>
            <h2 className={`${styles.infoTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>
            <p className="digits-with-shadow text_type_digits-large">
                {formattedNum(totalToday)}
            </p>
        </section>
    </>
}