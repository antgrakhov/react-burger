import React from 'react'
import {useSelector} from 'react-redux'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {useInView} from 'react-intersection-observer'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item'
import {ingredientsSelector} from '../../services/selectors'
import {TIngredient} from '../../types'

import styles from './burger-ingredients.module.css'

type TBurgerIngredients = {
    className: string
}

export default function BurgerIngredients({className}: TBurgerIngredients) {
    const {items} = useSelector(ingredientsSelector)
    const [tabActive, setTabActive] = React.useState('bun')

    const inViewOptions = {threshold: .2}
    const [refBun, inViewBun] = useInView(inViewOptions)
    const [refSauce, inViewSauce] = useInView(inViewOptions)
    const [refMain, inViewMain] = useInView(inViewOptions)

    React.useEffect( () => {
        let type = ''

        if (inViewBun) {
            type = 'bun'
        } else if (inViewSauce) {
            type = 'sauce'
        } else if (inViewMain) {
            type = 'main'
        }

        setTabActive(type)
    },[inViewBun, inViewSauce, inViewMain])

    const ingredientsData: any = {
        bun: {
            ref: refBun,
            label: 'Булки',
            data: React.useMemo(
                ()=>items.filter((item: TIngredient) => item.type === 'bun'),
                [items]
            )
        },
        sauce: {
            ref: refSauce,
            label: 'Соусы',
            data: React.useMemo(
                ()=>items.filter((item: TIngredient) => item.type === 'sauce'),
                [items]
            )
        },
        main: {
            ref: refMain,
            label: 'Начинки',
            data: React.useMemo(
                ()=>items.filter((item: TIngredient) => item.type === 'main'),
                [items]
            )
        }
    }

    function handleTabClick(tab: string) {
        const activeEl = document.getElementById(tab)

        if ( activeEl ) {
            activeEl.scrollIntoView({behavior: 'smooth'})
        }

        setTabActive(tab)
    }

    return <section className={`${styles.container} ${className}`}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <nav className={styles.tabs}>
            {Object.keys(ingredientsData).map((ingredient: string) =>
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
                                {ingredientsData[category].data.map((item: TIngredient) =>
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
