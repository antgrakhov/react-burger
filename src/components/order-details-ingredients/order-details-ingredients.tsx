import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {TOrderIngredient} from '../../types'

import styles from './order-details-ingredients.module.css'

type TOrderDetailsIngredients = {
    item: TOrderIngredient
    quantity: number
}

export default function OrderDetailsIngredients({item}: TOrderDetailsIngredients) {
    const {
        ingredient,
        quantity
    } = item

    return <li className={styles.item}>
        <div className={styles.thumbWrap}>
            <img
                className={styles.thumb}
                src={ingredient.image_mobile}
                alt={ingredient.name}
            />
        </div>
        <h3 className={`${styles.name} text`}>
            {ingredient.name}
        </h3>
        <div className={`${styles.price} text_type_digits-default`}>
            {quantity} x {ingredient.price}
            <CurrencyIcon type="primary"/>
        </div>
    </li>
}