import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag} from 'react-dnd'
import {ingredientVariantShape} from '../../utils/prop-types'

import styles from './burger-ingredients-item.module.css'

export default function BurgerIngredientsItem({item}) {
    const {selectedCounts} = useSelector(store => store.ingredientsConstructor)
    const currentIngredientCount = selectedCounts[item._id]
        ? selectedCounts[item._id].count
        : 0

    const location = useLocation()
    const linkTo = `/ingredients/${item._id}`

    // eslint-disable-next-line no-empty-pattern
    const [{}, dragSource] = useDrag({
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

BurgerIngredientsItem.propTypes = {
    item: ingredientVariantShape.isRequired,
}