import React, {useEffect} from 'react'
import {HashRouter as BrowserRouter} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import AppRoutes from '../../services/routes'
import AppHeader from '../app-header/app-header'
import {checkUserAuth} from '../../services/actions/user'
import {getIngredients} from '../../services/actions/ingredients'
import {ingredientsSelector} from '../../services/selectors'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

export default function App() {
    const dispatch = useAppDispatch()
    const {items} = useAppSelector(ingredientsSelector)

    useEffect(() => {
        dispatch(checkUserAuth())
    }, [dispatch])

    useEffect(() => {
        if ( items.length === 0 ) {
            dispatch(getIngredients())
        }
    }, [items, dispatch])

    return (<BrowserRouter>
        <AppHeader/>
        <main className={styles.main}>
            <div className={styles.inner}>
                <AppRoutes/>
            </div>
        </main>
    </BrowserRouter>)
}
