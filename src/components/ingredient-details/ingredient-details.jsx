import {useSelector} from 'react-redux'
import styles from './ingredient-details.module.css'

const detailList = {
    calories: {
        label: 'Калории, ккал'
    },
    proteins: {
        label: 'Белки, г'
    },
    fat: {
        label: 'Жиры, г'
    },
    carbohydrates: {
        label: 'Углеводы, г'
    },
}

export default function IngredientDetails() {
    const {items} = useSelector(store => store.ingredients)
    const {ingredientId} = useSelector(store => store.ingredientDetails)
    const ingredient = items.find(item => item._id === ingredientId)

    return <>
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
            {Object.keys(detailList).map(param =>
                <li key={param} className={styles.param}>
                    <span>{detailList[param].label}</span>
                    <b className="text_type_digits-default">{ingredient[param]}</b>
                </li>
            )}
        </ul>
    </>
}
