import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {getIngredients} from '../../services/actions/ingredients'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import Loader from '../../components/loader/loader'

import styles from './burger-constructor.module.css'

export default function BurgerConstructorPage() {
    const {
        ingredientsRequest,
        ingredientsFailed,
    } = useSelector(store => store.ingredients)
    const dispatch = useDispatch()

    /**
     * Loading data from API
     */
    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

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