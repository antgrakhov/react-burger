import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Page404 from '../../pages/404'
import Loader from '../loader/loader'
import {ingredientsSelector} from '../../services/selectors'

import styles from './ingredient-details.module.css'
import {TIngredient} from "../../types";

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
    } = useSelector(ingredientsSelector)

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
                {Object.keys(detailList).map(param => {
                    const label = Object.values(detailList)[Object.keys(detailList).indexOf(param)]

                    return <li key={param} className={styles.param}>
                        <span>{label}</span>
                        <b className="text_type_digits-default">{ingredient[param]}</b>
                    </li>
                })}
            </ul>
        </div>}
    </>
}
