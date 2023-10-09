import React from 'react'
import {useParams} from 'react-router-dom'
import {useAppSelector} from '../../utils/store'
import Page404 from '../../pages/404'
import Loader from '../loader/loader'
import {ingredientsSelector} from '../../services/selectors'
import {TIngredient} from '../../types'

import styles from './ingredient-details.module.css'

enum detailList {
    calories = 'Калории, ккал',
    proteins = 'Белки, г',
    fat = 'Жиры, г',
    carbohydrates = 'Углеводы, г',
}

type TIngredientDetails = {
    embed?: boolean
}

export default function IngredientDetails({embed}: TIngredientDetails) {
    const {
        items,
        ingredientsRequest,
    } = useAppSelector(ingredientsSelector)

    const {id} = useParams()
    const ingredient = items.find((item: TIngredient) => item._id === id)

    return <>
        {ingredientsRequest && <Loader/>}

        {
            !ingredientsRequest
            && !ingredient
            && <Page404/>
        }

        {ingredient && <div className={styles.container}>
            {!embed &&
                <h4 className="mt-4 mb-4 text_type_main-large">
                    Детали ингредиента
                </h4>
            }
            <img
                className={styles.thumb}
                src={ingredient.image_large}
                width={480}
                height={240}
                alt={ingredient.name}
            />
            <h5 className={`${styles.title} text_type_main-medium`}>
                {ingredient.name}
            </h5>
            <ul className={styles.list}>
                {Object.keys(detailList).map((param) => {
                    const label = Object.values(detailList)[Object.keys(detailList).indexOf(param)]
                    const value = Object.values(ingredient)[Object.keys(ingredient).indexOf(param)]

                    return <li key={param} className={styles.param}>
                        <span>{label}</span>
                        <b className="text_type_digits-default">
                            {value}
                        </b>
                    </li>
                })}
            </ul>
        </div>}
    </>
}
