import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients'

export default function App() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        getData()
    }, []);

    function getData() {
        setHasError(false)
        setIsLoading(true)

        fetch(dataUrl)
            .then(res => res.json())
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch(e => {
                setHasError(true)
                setIsLoading(false)
            });
    }

    return <>
        <AppHeader/>
        <main className={`${styles.main}${isLoading ? ' ' + styles.loading : ''}`}>
            <div className={styles.inner}>
                {!isLoading && !hasError && <>
                    <BurgerIngredients data={data} className={styles.section}/>
                    <BurgerConstructor data={data} className={styles.section}/>
                </>}
                {!isLoading && hasError && <p className={`${styles.error} text text_type_main-large`}>К сожалению, при загрузке данных произошла ошибка. Попробуйте перезагрузить страницу</p>}
            </div>
        </main>
    </>
}
