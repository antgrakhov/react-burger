import React from 'react'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrag} from 'react-dnd'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import {ingredientVariantShape} from '../../utils/prop-types'

import styles from './burger-ingredients-item.module.css'
import {useSelector} from "react-redux";

export default function BurgerIngredientsItem({item}) {
    const [isShowDetails, setIsShowDetails] = React.useState(false)

    const {selectedCounts} = useSelector(store => store.ingredientsConstructor)
    const currentIngredientCount = selectedCounts[item._id]
        ? selectedCounts[item._id].count
        : 0

    // eslint-disable-next-line no-empty-pattern
    const [{}, dragSource] = useDrag({
        type: item.type,
        item: {...item}
    })

    function handleShowDetails() {
        setIsShowDetails(true)
    }

    function handleHideDetails() {
        setIsShowDetails(false)
    }

    return <li
        ref={dragSource}
        className={styles.container}
        onClick={handleShowDetails}
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