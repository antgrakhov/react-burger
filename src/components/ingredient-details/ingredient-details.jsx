import {ingredientVariantShape} from '../../utils/prop-types'

import styles from './ingredient-details.module.css'

const detailList = {
    calories: {
        label: 'Калории,ккал'
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

export default function IngredientDetails({item}) {
    return <>
        <img
            className={styles.thumb}
            src={item.image_large}
            width={480}
            height={240}
            alt={item.name}
        />
        <h5 className={`${styles.title} text_type_main-medium`}>
            {item.name}
        </h5>
        <ul className={styles.list}>
            {Object.keys(detailList).map(param =>
                <li key={param} className={styles.param}>
                    <span>{detailList[param].label}</span>
                    <b className="text_type_digits-default">{item[param]}</b>
                </li>
            )}
        </ul>
    </>
}

IngredientDetails.propTypes = {
    item: ingredientVariantShape.isRequired
}