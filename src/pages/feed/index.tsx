import {useCallback} from 'react'
import {useAppSelector} from '../../utils/store'
import {feedOrdersSelector} from '../../services/selectors'
import OrderItem from '../../components/order-item/order-item'
import {ROUTE_FEED} from '../../utils/constants'
import {OrderStatusTypes, TOrderData} from '../../types'

import styles from './feed.module.css'
import ErrorMessage from "../../components/error-message/error-message";
import Loader from "../../components/loader/loader";

export default function FeedPage() {
    const maxShowOrdersNum = 5

    const {
        orders,
        total,
        totalToday,
        error,
    } = useAppSelector(feedOrdersSelector)

    const formattedNum = (num: string | number) => Number(num).toLocaleString('ru')

    const boardListByType = useCallback((statusType: OrderStatusTypes) => {
        const ordersByStatus = orders.filter((order: TOrderData) => order.status === statusType)
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
                        {formattedNum(total)}
                    </p>

                    <h2 className={`${styles.infoTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>

                    <p className="digits-with-shadow text_type_digits-large">
                        {formattedNum(totalToday)}
                    </p>
                </section>
            </>
        }
        {!error && orders.length === 0 && <Loader/>}
        {error &&
            <ErrorMessage
                title={`Возникла непредвиденная ошибка`}
                message={`Попробуйте перезагрузить страницу`}
            />
        }
    </>
}