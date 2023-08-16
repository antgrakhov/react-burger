import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {getIngredients} from '../../utils/burger-api'
import {BurgerIngredientsContext} from '../../services/burger-ingredients-context'
import {BurgerConstructorContext} from '../../services/burger-constructor-context'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

function getHardcodeInitSelectedIngredients(data) {
    const _ingredients = []

    data.forEach((ingredient, i) => {
        let count = 0

        /*buns*/
        if ( i === 7 ) {
            count = 2
        }

        /*other*/
        if ( [1, 2, 3, 4, 5].includes(i) ) {
            count = 1
        }

        for (let j = 0; j < count; j++) {
            _ingredients.push(ingredient)
        }
    })

    return _ingredients
}

export default function App() {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [selectedIngredients, setSelectedIngredients] = React.useState([])
    const [priceTotal, setPriceTotal] = React.useState(0)
    const [orderNumber, setOrderNumber] = React.useState(null)

    /**
     * Loading data from API
     */
    React.useEffect(() => {
        getIngredients()
            .then(res => {
                setIsLoading(false)

                if ( res.success === true ) {
                    setData(res.data)

                    /*hardcode selected data setter and price total*/
                    const hardcodeSelectedIngredients = getHardcodeInitSelectedIngredients(res.data)

                    setSelectedIngredients(
                        hardcodeSelectedIngredients
                    )

                    setPriceTotal(
                        hardcodeSelectedIngredients.reduce((total, ingredient) => {
                            return total + ingredient.price
                        }, 0)
                    )
                } else {
                    setHasError(true)
                }
            })
            .catch(() => {
                setHasError(true)
            })
    }, []);

    return <>
        <AppHeader/>
        <main className={`${styles.main}${isLoading ? ' ' + styles.loading : ''}`}>
            <div className={styles.inner}>
                {/*Success loading data*/}
                {!isLoading && !hasError && <>
                    <BurgerIngredientsContext.Provider value={{data, selectedIngredients}}>
                        <BurgerIngredients className={styles.section}/>
                    </BurgerIngredientsContext.Provider>

                    <BurgerConstructorContext.Provider value={{selectedIngredients, priceTotal, orderNumber, setOrderNumber}}>
                        <BurgerConstructor className={styles.section}/>
                    </BurgerConstructorContext.Provider>
                </>}

                {/*Error loading data*/}
                {!isLoading && hasError && <p className={`${styles.error} text text_type_main-medium`}>К сожалению, при загрузке данных произошла ошибка.<br/> Попробуйте перезагрузить страницу</p>}
            </div>
        </main>
    </>
}
