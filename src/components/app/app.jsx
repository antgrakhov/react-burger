import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {getIngredients} from '../../services/actions/ingredients'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

export default function App() {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients)
    const dispatch = useDispatch()

    /**
     * Loading data from API
     */
    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

    return <>
        <AppHeader/>
        <main className={`${styles.main}${ingredientsRequest ? ' ' + styles.loading : ''}`}>
            <div className={styles.inner}>
                {/*Success loading data*/}
                {!ingredientsRequest && !ingredientsFailed &&
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients className={styles.section}/>
                        <BurgerConstructor className={styles.section}/>
                    </DndProvider>
                }

                {/*Error loading data*/}
                {!ingredientsRequest && ingredientsFailed && <p className={`${styles.error} text text_type_main-medium`}>К сожалению, при загрузке данных произошла ошибка.<br/> Попробуйте перезагрузить страницу</p>}
            </div>
        </main>
    </>
}
