import {TIngredient} from '../../types'

import styles from './order-item-ingredients.module.css'

type TFeedItem = {
    ingredients: TIngredient[]
    maxViewedElements: number
}

export default function OrderItemIngredients({ingredients, maxViewedElements}: TFeedItem) {
    const _ingredients = ingredients.slice(0, maxViewedElements)
    const howMoreNums = ingredients.length > maxViewedElements
        ? ingredients.length - maxViewedElements
        : 0

    return <ul className={styles.list}>
        {_ingredients.map((ingredient: TIngredient, index: number) =>
            <li
                key={index}
                className={styles.item}
            >
                <img
                    className={styles.thumb}
                    src={ingredient.image_mobile}
                    width={60}
                    height={60}
                    alt={ingredient.name}
                />
                {howMoreNums > 0 && index === 0 &&
                    <span className={styles.more}>
                        +{howMoreNums}
                    </span>
                }
            </li>
        )}
    </ul>
}