import React from 'react'
import {useAppSelector} from '../../utils/store'
import {orderSelector} from '../../services/selectors'

import styles from './order-details.module.css'

export default function OrderDetails() {
    const {orderNumber} = useAppSelector(orderSelector)

    return <div className={styles.container}>
        <h5 className="digits-with-shadow text_type_digits-large">
            {orderNumber}
        </h5>
        <p className={`${styles.description} text_type_main-medium`}>идентификатор заказа</p>
        <p>Ваш заказ начали готовить</p>
        <p className="text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
}