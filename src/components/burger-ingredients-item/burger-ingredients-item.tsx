import React from 'react'
import {useAppSelector} from '../../utils/store'
import {Link, useLocation} from 'react-router-dom'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag} from 'react-dnd'
import {ingredientsConstructorSelector} from '../../services/selectors'
import {TIngredient} from '../../types'

import styles from './burger-ingredients-item.module.css'

type TBurgerIngredientsItem = {
    item: TIngredient
}

export default function BurgerIngredientsItem({item}: TBurgerIngredientsItem) {
    const {selectedCounts} = useAppSelector(ingredientsConstructorSelector)
    const currentIngredientCount = selectedCounts[item._id]
        ? selectedCounts[item._id].count
        : 0

    const location = useLocation()
    const linkTo = `/ingredients/${item._id}`

    const [ , dragSource] = useDrag({
        type: item.type,
        item: {...item}
    })

    return <li
        ref={dragSource}
        className={styles.container}
        draggable
    >
        <Link
            className={styles.link}
            to={linkTo}
            state={{background: location}}
        >
            {
                currentIngredientCount > 0
                && <Counter
                    count={currentIngredientCount}
                    size="default"
                    extraClass="m-1"
                />
            }
            <img
                className={styles.thumb}
                src={item.image}
                width={240}
                height={120}
                alt={item.name}
            />
            <div className={`${styles.price} text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary"/>
            </div>
            <h3 className={`${styles.name} text text_type_main-default`}>
                {item.name}
            </h3>
        </Link>
    </li>
}
