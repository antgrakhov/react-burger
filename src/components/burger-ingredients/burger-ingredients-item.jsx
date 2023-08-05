import React from 'react'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'

export default function BurgerIngredientsItem({item}) {
    const [count, setCount] = React.useState(0)

    return <>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
        <img
            className={styles.thumb}
            src={item.image}
            alt={item.name}
        />
        <div className={`${styles.price} text_type_digits-default`}>
            {item.price}
            <CurrencyIcon type="primary"/>
        </div>
        <h3 className={`${styles.name} text text_type_main-default`}>
            {item.name}
        </h3>
    </>
}