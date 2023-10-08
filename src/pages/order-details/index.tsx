import {useLocation, useParams} from 'react-router-dom'
import OrderDetailsIngredients from '../../components/order-details-ingredients/order-details-ingredients'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './order-details.module.css'
import {useAppSelector} from "../../utils/store";
import {feedOrdersSelector, ingredientsSelector} from "../../services/selectors";
import {TIngredient} from "../../types";
import {useMemo} from "react";
import getTotalPrice from "../../utils/totalPrice";

const list = [
    {
        "_id": "643d69a5c3f7b9001cfa093f",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa093f",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0949",
        "name": "Мини-салат Экзо-Плантаго",
        "type": "main",
        "proteins": 1,
        "fat": 2,
        "carbohydrates": 3,
        "calories": 6,
        "price": 4400,
        "image": "https://code.s3.yandex.net/react/code/salad.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0949",
        "name": "Мини-салат Экзо-Плантаго",
        "type": "main",
        "proteins": 1,
        "fat": 2,
        "carbohydrates": 3,
        "calories": 6,
        "price": 4400,
        "image": "https://code.s3.yandex.net/react/code/salad.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0949",
        "name": "Мини-салат Экзо-Плантаго",
        "type": "main",
        "proteins": 1,
        "fat": 2,
        "carbohydrates": 3,
        "calories": 6,
        "price": 4400,
        "image": "https://code.s3.yandex.net/react/code/salad.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa094a",
        "name": "Сыр с астероидной плесенью",
        "type": "main",
        "proteins": 84,
        "fat": 48,
        "carbohydrates": 420,
        "calories": 3377,
        "price": 4142,
        "image": "https://code.s3.yandex.net/react/code/cheese.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
        "__v": 0
    },
    {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    },
]

type TOrderDetailsPage = {
    embed?: boolean
}

export default function OrderDetailsPage({embed}: TOrderDetailsPage) {
    const {id} = useParams()
    // const location = useLocation()
    const {items} = useAppSelector(ingredientsSelector)
    const {orders} = useAppSelector(feedOrdersSelector)
    const order = orders.find(order => order.number === Number(id))

    console.log(orders)

    const isEmbedStyle = embed ? ' ' + styles.embed : ''
    // const isFeed = location.pathname.includes(ROUTE_FEED)

    const totalPrice = useMemo(() => {
        return order
            ? getTotalPrice(items.filter((item: TIngredient) => order.ingredients.includes(item._id)))
            : 0
    }, [order, items])

    return <div className={`${styles.container}${isEmbedStyle}`}>
        {order && <>
            <div className={`${styles.num} text text_type_digits-default`}>
                #{id}
            </div>
            <h1 className={`${styles.title} text text_type_main-medium`}>
                {order.name}
            </h1>
            <div className={`${styles.status} _done`}>
                Выполнен
            </div>
            <h2 className={`${styles.subtitle} text text_type_main-medium`}>
                Состав:
            </h2>
            <div className={styles.listWrap}>
                <ul className={`${styles.list} custom-scroll`}>
                    {order.ingredients.map((id: string, index: number) =>
                        <OrderDetailsIngredients
                            key={index}
                            id={id}
                        />
                    )}
                </ul>
            </div>
            <div className={styles.meta}>
                <div className={`${styles.date} text_color_inactive`}>
                    {order.createdAt}
                </div>
                <div className={`${styles.price} text_type_digits-default`}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </>}
    </div>
}