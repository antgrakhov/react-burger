import React from 'react'
import {useSelector} from 'react-redux'

import styles from './order-details.module.css'

export default function OrderDetails() {
    const {orderNumber} = useSelector(store => store.order)

    return <div className={styles.container}>
        <h5 className={`${styles.num} text_type_digits-large`}>
            {orderNumber}
        </h5>
        <p className={`${styles.description} text_type_main-medium`}>идентификатор заказа</p>
        <p className={styles.begin}>Ваш заказ начали готовить</p>
        <p className={`${styles.wait} text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
}