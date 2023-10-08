import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useAppSelector} from '../../utils/store'
import {TIngredient} from '../../types'
import {ingredientsSelector} from '../../services/selectors'

import styles from './order-details-ingredients.module.css'

type TOrderDetailsIngredients = {
    id: string
}

export default function OrderDetailsIngredients({id}: TOrderDetailsIngredients) {
    const {items} = useAppSelector(ingredientsSelector)
    const item = items.filter((item: TIngredient) => item._id === id)

    return <li className={styles.item}>
        <div className={styles.thumbWrap}>
            <img
                className={styles.thumb}
                src={item.image_mobile}
                alt={item.name}
            />
        </div>
        <h3 className={`${styles.name} text`}>
            {item.name}
        </h3>
        <div className={`${styles.price} text_type_digits-default`}>
            {item.price}
            <CurrencyIcon type="primary"/>
        </div>
    </li>
}