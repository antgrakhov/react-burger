import React from 'react'
import {useSelector} from 'react-redux'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag} from 'react-dnd'
import PropTypes from 'prop-types'
import {ingredientVariantShape} from '../../utils/prop-types'

import styles from './burger-ingredients-item.module.css'

export default function BurgerIngredientsItem({item, onIngredientClick}) {
    const {selectedCounts} = useSelector(store => store.ingredientsConstructor)
    const currentIngredientCount = selectedCounts[item._id]
        ? selectedCounts[item._id].count
        : 0

    // eslint-disable-next-line no-empty-pattern
    const [{}, dragSource] = useDrag({
        type: item.type,
        item: {...item}
    })

    return <li
        ref={dragSource}
        className={styles.container}
        onClick={onIngredientClick}
        draggable
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
    </li>
}

BurgerIngredientsItem.propTypes = {
    item: ingredientVariantShape.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
}