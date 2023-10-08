import OrderItem from '../order-item/order-item'
import {
    ROUTE_PROFILE,
    ROUTE_PROFILE_ORDERS,
} from '../../utils/constants'

import styles from './profile-orders.module.css'

const list = [
    {
        num: '123456',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093e",
                "name": "Филе Люминесцентного тетраодонтимформа",
                "type": "main",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/meat-03.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
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
        ],
        price: '480',
    },
    {
        num: '789012',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
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
            }
        ],
        price: '480',
    },
    {
        num: '345678',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
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
            {
                "_id": "643d69a5c3f7b9001cfa0943",
                "name": "Соус фирменный Space Sauce",
                "type": "sauce",
                "proteins": 50,
                "fat": 22,
                "carbohydrates": 11,
                "calories": 14,
                "price": 80,
                "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0945",
                "name": "Соус с шипами Антарианского плоскоходца",
                "type": "sauce",
                "proteins": 101,
                "fat": 99,
                "carbohydrates": 100,
                "calories": 100,
                "price": 88,
                "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
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
            }
        ],
        price: '480',
    },
    {
        num: '901234',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0943",
                "name": "Соус фирменный Space Sauce",
                "type": "sauce",
                "proteins": 50,
                "fat": 22,
                "carbohydrates": 11,
                "calories": 14,
                "price": 80,
                "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                "__v": 0
            },
        ],
        price: '480',
    },
    {
        num: '567890',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
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
            {
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0946",
                "name": "Хрустящие минеральные кольца",
                "type": "main",
                "proteins": 808,
                "fat": 689,
                "carbohydrates": 609,
                "calories": 986,
                "price": 300,
                "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
                "__v": 0
            },
        ],
        price: '480',
    },
    {
        num: '012345',
        status: 'Выполнен',
        date: 'Сегодня, 13:20',
        title: 'Death Star Starship Main бургер',
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0943",
                "name": "Соус фирменный Space Sauce",
                "type": "sauce",
                "proteins": 50,
                "fat": 22,
                "carbohydrates": 11,
                "calories": 14,
                "price": 80,
                "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0948",
                "name": "Кристаллы марсианских альфа-сахаридов",
                "type": "main",
                "proteins": 234,
                "fat": 432,
                "carbohydrates": 111,
                "calories": 189,
                "price": 762,
                "image": "https://code.s3.yandex.net/react/code/core.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0946",
                "name": "Хрустящие минеральные кольца",
                "type": "main",
                "proteins": 808,
                "fat": 689,
                "carbohydrates": 609,
                "calories": 986,
                "price": 300,
                "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
                "__v": 0
            },
        ],
        price: '480',
    },
]

export default function ProfileOrders() {
    const path = `${ROUTE_PROFILE}/${ROUTE_PROFILE_ORDERS}`

    return <div className={styles.container}>
        <div className={styles.wrap}>
            <ul className={`${styles.list} custom-scroll`}>
                {list.map((item: any, index: number) =>
                    <p>123</p>
                    // <OrderItem
                    //     key={index}
                    //     item={item}
                    //     path={path}
                    // />
                )}
            </ul>
        </div>
    </div>
}