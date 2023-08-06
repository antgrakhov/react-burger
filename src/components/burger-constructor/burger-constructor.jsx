import React from 'react'
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import {ingredientArray} from '../../utils/prop-types'

import styles from './burger-constructor.module.css'

export default function BurgerConstructor({className, data}) {
    const topBurgerIngredient = {
        ...data[0],
        name: 'Краторная булка N-200i (верх)',
        price: 20
    }
    const bottomBurgerIngredient = {
        ...data[0],
        name: 'Краторная булка N-200i (низ)',
        price: 20
    }

    return <section className={`${styles.container} ${className}`}>
        <div className={styles.top}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={topBurgerIngredient.name}
                price={topBurgerIngredient.price}
                thumbnail={topBurgerIngredient.image}
            />
        </div>
        <div className={styles['list-wrap']}>
            <ul className={`${styles.list} custom-scroll`}>
                {data.map(item =>
                    <li key={item._id} className={styles.item}>
                        <button className={styles.dragger}>
                            <DragIcon type="primary"/>
                        </button>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </li>
                )}
            </ul>
        </div>
        <div className={styles.bottom}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bottomBurgerIngredient.name}
                price={bottomBurgerIngredient.price}
                thumbnail={bottomBurgerIngredient.image}
            />
        </div>
        <div className={styles.total}>
            <div className={`${styles.price} text_type_digits-medium`}>
                610
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    </section>
}

BurgerConstructor.propTypes = {
    className: PropTypes.string,
    data: ingredientArray.isRequired
}
