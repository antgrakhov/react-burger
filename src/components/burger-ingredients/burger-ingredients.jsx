import React from 'react'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from './burger-ingredients-item'
import PropTypes from 'prop-types'
import {ingredientArray} from '../../utils/prop-types'

import styles from './burger-ingredients.module.css'

const ingredients = {
    bun: {
        label: 'Булки'
    },
    sauce: {
        label: 'Соусы'
    },
    main: {
        label: 'Начинки'
    }
}

export default function BurgerIngredients({className, data}) {
    const [tabActive, setTabActive] = React.useState('bun')

    return <section className={`${styles.container} ${className}`}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <nav className={styles.tabs}>
            {Object.keys(ingredients).map(ingredient =>
                <Tab
                    key={ingredient}
                    value={ingredient}
                    active={tabActive === ingredient}
                    onClick={setTabActive}
                >
                    {ingredients[ingredient].label}
                </Tab>
            )}
        </nav>

        <div className={styles.wrapper}>
            <dl className={`${styles.content} custom-scroll`}>
                {Object.keys(ingredients).map(ingredient =>
                    <React.Fragment key={ingredient}>
                        <dt id={`ingredients-${ingredient}`}>
                            <h2 className={styles.subtitle}>{ingredients[ingredient].label}</h2>
                        </dt>
                        <dd className={styles['list-wrap']}>
                            <ul className={styles.list}>
                                {data.filter(item => item.type === ingredient).map(item =>
                                    <li key={item._id} className={styles.item}>
                                        <BurgerIngredientsItem item={item}/>
                                    </li>
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
    data: ingredientArray.isRequired
}