import React, {useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from 'react-dnd'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import emptyImage from '../../images/empty.png'
import PropTypes from 'prop-types'
import {
    ADD_CONSTRUCTOR_BUN_ITEM,
    ADD_CONSTRUCTOR_INSIDE_ITEM,
    REMOVE_CONSTRUCTOR_INSIDE_ITEM,
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
    const dispatch = useDispatch()

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
            dispatch({
                type: ADD_CONSTRUCTOR_BUN_ITEM,
                payload: item,
            })
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
            dispatch({
                type: ADD_CONSTRUCTOR_INSIDE_ITEM,
                payload: item,
            })
        },
        collect(monitor) {
            return {
                canDropInside: monitor.canDrop(),
                isOverInside: monitor.isOver(),
            }
        }
    }))

    function handleRemoveInsideItem(id, uniqueId) {
        dispatch({
            id,
            uniqueId,
            type: REMOVE_CONSTRUCTOR_INSIDE_ITEM
        })
    }

    function handleSendSubmitOrder() {
        dispatch({
            type: SHOW_ORDER_MODAL
        })

        dispatch(sendSubmitOrder({
            ingredients: selectedItems.map(ingredient => ingredient._id)
        }))
    }

    function handleCloseModal() {
        dispatch({
            type: HIDE_ORDER_MODAL
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
                {insideItems.map(item =>
                    <li key={item.uniqueId} className={styles.item}>
                        <button className={styles.dragger}>
                            <DragIcon type="primary"/>
                        </button>
                        <ConstructorElement
                            item={item}
                            text={item.name}
                            thumbnail={item.image}
                            price={item.price}
                            handleClose={()=> handleRemoveInsideItem(
                                item._id,
                                item.uniqueId
                            )}
                        />
                    </li>
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
            <div className={`${styles.price} text_type_digits-medium`}>
                {priceTotal}
                <CurrencyIcon type="primary" />
            </div>
            <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={handleSendSubmitOrder}
                disabled={selectedItems.filter(item => ['main', 'sauce'].includes(item.type)).length === 0}
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
