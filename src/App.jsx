import React from 'react'

import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

import data from './utils/data.json'

import styles from './app.module.css'
import '@ya.praktikum/react-developer-burger-ui-components'

export default function App() {
    return <>
        <AppHeader/>
        <main className={styles.main}>
            <BurgerIngredients data={data} className={styles.section}/>
            <BurgerConstructor data={data} className={styles.section}/>
        </main>
    </>
}
