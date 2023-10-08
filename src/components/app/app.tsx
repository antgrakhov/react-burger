import React, {useEffect, Dispatch} from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from '../../services/routes'
import {useDispatch, useSelector} from 'react-redux'
import AppHeader from '../app-header/app-header'
import {checkUserAuth} from '../../services/actions/user'
import {getIngredients} from '../../services/actions/ingredients'
import {ingredientsSelector} from '../../services/selectors'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'
import {FEED_ORDERS_CONNECTION_START, FEED_ORDERS_CONNECTION_STOP} from "../../services/actions/feed-orders";
import {WS_API_URL} from "../../utils/constants";

export default function App() {
    const dispatch: Dispatch<any> = useDispatch()
    const {items} = useSelector(ingredientsSelector)

    useEffect(() => {
        dispatch(checkUserAuth())
    }, [dispatch])

    useEffect(() => {
        if ( items.length === 0 ) {
            dispatch(getIngredients())
        }
    }, [items, dispatch])

    useEffect(() => {
        dispatch({
            type: FEED_ORDERS_CONNECTION_START,
            payload: `${WS_API_URL}/orders/all`
        })

        return () => {
            dispatch({
                type: FEED_ORDERS_CONNECTION_STOP
            })
        }
    }, [dispatch])

    return <BrowserRouter>
        <AppHeader/>
        <main className={styles.main}>
            <div className={styles.inner}>
                <AppRoutes/>
            </div>
        </main>
    </BrowserRouter>
}
