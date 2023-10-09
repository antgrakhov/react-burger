import React, {useMemo} from 'react'
import {useAppDispatch, useAppSelector} from '../../utils/store'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from 'react-dnd'
import {useNavigate} from 'react-router-dom'
import BurgerConstructorInsideItem from '../burger-constructor-inside-item/burger-constructor-inside-item'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import emptyImage from '../../images/empty.png'
import getTotalPrice from '../../utils/totalPrice'
import {
    addToConstructorBunItem,
    addToConstructorInsideItem,
    CLEAR_CONSTRUCTOR,
} from '../../services/actions/constructor'
import {
    HIDE_ORDER_MODAL,
    SHOW_ORDER_MODAL,
    sendSubmitOrder,
} from '../../services/actions/order'
import {ROUTE_LOGIN} from '../../utils/constants'
import {
    ingredientsConstructorSelector,
    orderSelector,
    userSelector,
} from '../../services/selectors'
import {TIngredientUnique} from '../../types'

import styles from './burger-constructor.module.css'

type TBurgerConstructor = {
    className: string
}

export default function BurgerConstructor({className}: TBurgerConstructor) {
    const {selectedItems} = useAppSelector(ingredientsConstructorSelector)
    const {
        orderRequest,
        orderFailed,
        isShowModalOrder
    } = useAppSelector(orderSelector)
    const {isLogged} = useAppSelector(userSelector)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const bunItem = useMemo(() => {
        return selectedItems.find((el: TIngredientUnique) => el.type === 'bun')
    }, [selectedItems])
    const insideItems = useMemo(() => {
        return selectedItems.filter((el: TIngredientUnique) => el.type !== 'bun')
    }, [selectedItems])

    const priceTotal = useMemo(() => {
        let totalPrice = 0
        const bunItem = selectedItems.find((el: TIngredientUnique) => el.type === 'bun')

        if ( bunItem ) {
            totalPrice = getTotalPrice(selectedItems)
        }

        return totalPrice
    }, [selectedItems])

    const [{canDropBun, isOverBun}, dropBunRef] = useDrop(() => ({
        accept: 'bun',
        drop(item: TIngredientUnique) {
            dispatch(addToConstructorBunItem(item))
        },
        collect(monitor) {
            return {
                canDropBun: monitor.canDrop(),
                isOverBun: monitor.isOver(),
            }
        }
    }))

    const [{canDropInside, isOverInside}, dropInsideRef] = useDrop(() => ({
        accept: ['main', 'sauce'],
        drop(item: TIngredientUnique) {
            dispatch(addToConstructorInsideItem(item))
        },
        collect(monitor) {
            return {
                canDropInside: monitor.canDrop(),
                isOverInside: monitor.isOver(),
            }
        }
    }))

    function handleSendSubmitOrder() {
        if ( !isLogged ) {
            navigate(ROUTE_LOGIN)
        } else {
            dispatch({
                type: SHOW_ORDER_MODAL
            })

            dispatch(sendSubmitOrder({
                ingredients: selectedItems.map((ingredient: TIngredientUnique) => ingredient._id)
            }))
        }
    }

    function handleCloseModal() {
        dispatch({
            type: HIDE_ORDER_MODAL
        })

        dispatch({
            type: CLEAR_CONSTRUCTOR
        })
    }

    return <section
        ref={dropBunRef}
        className={`${styles.container} ${className} ${canDropBun ? styles.canDropBun : ''} ${isOverBun ? styles.isOverBun : ''}`}
    >
        <div className={styles.top}>
            <ConstructorElement
                type="top"
                text={bunItem ? bunItem.name + ' (верх)' : 'Добавьте булку'}
                thumbnail={bunItem ? bunItem.image : emptyImage}
                price={bunItem ? bunItem.price : 0}
                isLocked
            />
        </div>
        <div
            ref={dropInsideRef}
            className={`${styles['list-wrap']} ${canDropInside ? styles.canDropInside : ''} ${isOverInside ? styles.isOverInside : ''}`}
        >
            <ul className={`${styles.list} custom-scroll`}
            >
                {insideItems.map((item: TIngredientUnique, index: number) =>
                    <BurgerConstructorInsideItem
                        key={item.uniqueId}
                        index={index}
                        ingredient={item}
                    />
                )}
            </ul>
        </div>
        <div className={styles.bottom}>
            <ConstructorElement
                type="bottom"
                text={bunItem ? bunItem.name + ' (низ)' : 'Добавьте булку'}
                thumbnail={bunItem ? bunItem.image : emptyImage}
                price={bunItem ? bunItem.price : 0}
                isLocked
            />
        </div>
        <div className={styles.total}>
            {priceTotal > 0 && <div className={`${styles.price} text_type_digits-medium`}>
                {priceTotal}
                <CurrencyIcon type="primary" />
            </div>}
            <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={handleSendSubmitOrder}
                disabled={selectedItems.length === 0}
            >
                Оформить заказ
            </Button>
        </div>
        {isShowModalOrder && !orderRequest && <Modal onClose={handleCloseModal}>
            <>
                {!orderFailed && <OrderDetails/>}
                {orderFailed && <p>К сожалению, в момент отправки заказа возникла ошибка.<br/>Попробуйте перезагрузить страницу и отправить заказ снова.</p>}
            </>
        </Modal>}
    </section>
}
