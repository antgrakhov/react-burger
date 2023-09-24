import {useEffect, Dispatch} from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from '../../services/routes'
import {useDispatch} from 'react-redux'
import AppHeader from '../app-header/app-header'
import {checkUserAuth} from '../../services/actions/user'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

export default function App() {
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(checkUserAuth())
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
