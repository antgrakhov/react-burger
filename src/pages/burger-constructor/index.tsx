import React, {Dispatch} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import {getIngredients} from '../../services/actions/ingredients'
import Loader from '../../components/loader/loader'
import {ingredientsSelector} from '../../services/selectors'

import styles from './burger-constructor.module.css'

export default function BurgerConstructorPage() {
    const {
        items,
        ingredientsRequest,
        ingredientsFailed,
    } = useSelector(ingredientsSelector)

    const dispatch: Dispatch<any> = useDispatch()

    React.useEffect(() => {
        if ( items.length === 0 ) {
            dispatch(getIngredients())
        }
    }, [items, dispatch])

    return <>
            {ingredientsRequest && <Loader/>}

            {!ingredientsRequest && !ingredientsFailed &&
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className={styles.section}/>
                    <BurgerConstructor className={styles.section}/>
                </DndProvider>
            }

            {!ingredientsRequest && ingredientsFailed && <p className={`${styles.error} text text_type_main-medium`}>К сожалению, при загрузке данных произошла ошибка.<br/> Попробуйте перезагрузить страницу</p>}
    </>
}