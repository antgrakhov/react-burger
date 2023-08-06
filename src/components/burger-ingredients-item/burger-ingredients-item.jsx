import React from 'react'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import {ingredientVariantShape} from '../../utils/prop-types'

import styles from './burger-ingredients-item.module.css'

export default function BurgerIngredientsItem({item}) {
    const [count, setCount] = React.useState(0)
    const [isShowDetails, setIsShowDetails] = React.useState(false)

    function handleShowDetails() {
        setIsShowDetails(true)
    }

    function handleHideDetails() {
        setIsShowDetails(false)
    }

    return <li
        className={styles.container}
        onClick={handleShowDetails}
    >
        {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
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
        {isShowDetails &&
            <Modal label="Детали ингредиента" onClose={handleHideDetails}>
                <IngredientDetails item={item}/>
            </Modal>
        }
    </li>
}

BurgerIngredientsItem.propTypes = {
    item: ingredientVariantShape.isRequired
}