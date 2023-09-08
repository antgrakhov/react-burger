import React, {useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from 'react-dnd'
import {useLocation, useNavigate} from 'react-router-dom'
import BurgerConstructorInsideItem from '../burger-constructor-inside-item/burger-constructor-inside-item'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import emptyImage from '../../images/empty.png'
import PropTypes from 'prop-types'
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
import {getBurgerPriceTotal} from '../../utils/get-burger-price-total'

import styles from './burger-constructor.module.css'

export default function BurgerConstructor({className}) {
    const {selectedItems} = useSelector(store => store.ingredientsConstructor)
    const {
        orderRequest,
        orderFailed,
        isShowModalOrder
    } = useSelector(store => store.order)
    const {user} = useSelector(store => store.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bunItem = useMemo(() => {
        return selectedItems.find(el => el.type === 'bun')
    }, [selectedItems])
    const insideItems = useMemo(() => {
        return selectedItems.filter(el => el.type !== 'bun')
    }, [selectedItems])

    const priceTotal = getBurgerPriceTotal(selectedItems)

    const [{canDropBun, isOverBun}, dropBunRef] = useDrop(() => ({
        accept: 'bun',
        drop(item) {
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
        drop(item) {
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
        if ( !user.isLogged ) {
            navigate('/login')
        } else {
            dispatch({
                type: SHOW_ORDER_MODAL
            })

            dispatch(sendSubmitOrder({
                ingredients: selectedItems.map(ingredient => ingredient._id)
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
                item={bunItem}
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
                {insideItems.map((item, index) =>
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
                item={bunItem}
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

BurgerConstructor.propTypes = {
    className: PropTypes.string,
}
