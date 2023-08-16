import React from 'react'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item'
import PropTypes from 'prop-types'

import styles from './burger-ingredients.module.css'
import {BurgerIngredientsContext} from '../../services/burger-ingredients-context'

export default function BurgerIngredients({className}) {
    const [tabActive, setTabActive] = React.useState('bun')

    const {data} = React.useContext(BurgerIngredientsContext)

    const ingredientsData = {
        bun: {
            label: 'Булки',
            data: React.useMemo(
                ()=>data.filter(item => item.type === 'bun'),
                [data]
            )
        },
        sauce: {
            label: 'Соусы',
            data: React.useMemo(
                ()=>data.filter(item => item.type === 'sauce'),
                [data]
            )
        },
        main: {
            label: 'Начинки',
            data: React.useMemo(
                ()=>data.filter(item => item.type === 'main'),
                [data]
            )
        }
    }

    return <section className={`${styles.container} ${className}`}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <nav className={styles.tabs}>
            {Object.keys(ingredientsData).map(ingredient =>
                <Tab
                    key={ingredient}
                    value={ingredient}
                    active={tabActive === ingredient}
                    onClick={setTabActive}
                >
                    {ingredientsData[ingredient].label}
                </Tab>
            )}
        </nav>

        <div className={styles.wrapper}>
            <dl className={`${styles.content} custom-scroll`}>
                {Object.keys(ingredientsData).map(ingredient =>
                    <React.Fragment key={ingredient}>
                        <dt id={`ingredients-${ingredient}`}>
                            <h2 className={styles.subtitle}>{ingredientsData[ingredient].label}</h2>
                        </dt>
                        <dd className={styles['list-wrap']}>
                            <ul className={styles.list}>
                                {ingredientsData[ingredient].data.map(item =>
                                    <BurgerIngredientsItem
                                        key={item._id}
                                        item={item}
                                    />
                                )}
                            </ul>
                        </dd>
                    </React.Fragment>
                )}
            </dl>
        </div>
    </section>
}

BurgerIngredients.propTypes = {
    className: PropTypes.string,
}