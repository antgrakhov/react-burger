import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {useInView} from 'react-intersection-observer'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item'
import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
} from '../../services/actions/ingredient-details'
import PropTypes from 'prop-types'

import styles from './burger-ingredients.module.css'

export default function BurgerIngredients({className}) {
    const dispatch = useDispatch()

    const {items} = useSelector(store => store.ingredients)
    const [tabActive, setTabActive] = React.useState('bun')

    const {isDetailsModalShow} = useSelector(store => store.ingredientDetails)

    const inViewOptions = {threshold: .2}
    const [refBun, inViewBun] = useInView(inViewOptions)
    const [refSauce, inViewSauce] = useInView(inViewOptions)
    const [refMain, inViewMain] = useInView(inViewOptions)

    React.useEffect( () => {
        let type

        if (inViewBun) {
            type = 'bun'
        } else if (inViewSauce) {
            type = 'sauce'
        } else if (inViewMain) {
            type = 'main'
        }

        setTabActive(type)
    },[inViewBun, inViewSauce, inViewMain])

    const ingredientsData = {
        bun: {
            ref: refBun,
            label: 'Булки',
            data: React.useMemo(
                ()=>items.filter(item => item.type === 'bun'),
                [items]
            )
        },
        sauce: {
            ref: refSauce,
            label: 'Соусы',
            data: React.useMemo(
                ()=>items.filter(item => item.type === 'sauce'),
                [items]
            )
        },
        main: {
            ref: refMain,
            label: 'Начинки',
            data: React.useMemo(
                ()=>items.filter(item => item.type === 'main'),
                [items]
            )
        }
    }

    function handleTabClick(tab) {
        const activeEl = document.getElementById(tab)

        if ( activeEl ) {
            activeEl.scrollIntoView({behavior: 'smooth'})
        }

        setTabActive(tab)
    }

    function handleHideIngredientDetails() {
        dispatch({
            type: HIDE_INGREDIENT_DETAILS,
        })
    }

    function handleShowIngredientDetails(id) {
        dispatch({
            type: SHOW_INGREDIENT_DETAILS,
            payload: {
                id
            }
        })
    }

    return <section className={`${styles.container} ${className}`}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <nav className={styles.tabs}>
            {Object.keys(ingredientsData).map(ingredient =>
                <Tab
                    key={ingredient}
                    value={ingredient}
                    active={tabActive === ingredient}
                    onClick={handleTabClick}
                >
                    {ingredientsData[ingredient].label}
                </Tab>
            )}
        </nav>

        <div className={styles.wrapper}>
            <dl className={`${styles.content} custom-scroll`}>
                {Object.keys(ingredientsData).map(category =>
                    <React.Fragment key={category}>
                        <dt id={category}>
                            <h2 className={styles.subtitle}>{ingredientsData[category].label}</h2>
                        </dt>
                        <dd
                            ref={ingredientsData[category].ref}
                            className={styles['list-wrap']}
                        >
                            <ul className={styles.list}>
                                {ingredientsData[category].data.map(item =>
                                    <BurgerIngredientsItem
                                        key={item._id}
                                        item={item}
                                        onIngredientClick={() => handleShowIngredientDetails(item._id)}
                                    />
                                )}
                            </ul>
                        </dd>
                    </React.Fragment>
                )}
            </dl>
        </div>

        {isDetailsModalShow &&
            <Modal
                label="Детали ингредиента"
                onClose={handleHideIngredientDetails}
            >
                <IngredientDetails/>
            </Modal>
        }
    </section>
}

BurgerIngredients.propTypes = {
    className: PropTypes.string,
}