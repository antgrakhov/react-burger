import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {getIngredients} from '../../utils/burger-api'


import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

export default function App() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        setIsLoading(true)

        getIngredients()
            .then(res => {
                setIsLoading(false)

                if ( res.success === true ) {
                    setData(res.data)
                } else {
                    setHasError(true)
                }
            })
            .catch(e => {
                setHasError(true)
            })
    }, []);

    return <>
        <AppHeader/>
        <main className={`${styles.main}${isLoading ? ' ' + styles.loading : ''}`}>
            <div className={styles.inner}>
                {!isLoading && !hasError && <>
                    <BurgerIngredients data={data} className={styles.section}/>
                    <BurgerConstructor data={data} className={styles.section}/>
                </>}
                {!isLoading && hasError && <p className={`${styles.error} text text_type_main-medium`}>К сожалению, при загрузке данных произошла ошибка.<br/> Попробуйте перезагрузить страницу</p>}
            </div>
        </main>
    </>
}
