import React from 'react'
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import PropTypes from 'prop-types'
import {sendSubmitOrder} from '../../utils/burger-api'
import {BurgerGeneralContext} from '../../services/burger-general-context'
import {BurgerConstructorContext} from '../../services/burger-constructor-context'

import styles from './burger-constructor.module.css'

export default function BurgerConstructor({className}) {
    const [isShowOrderDetails, setIsShowOrderDetails] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const {selectedIngredients} = React.useContext(BurgerGeneralContext)
    const {
        priceTotal,
        setOrderNumber
    } = React.useContext(BurgerConstructorContext)

    const ingredientsData = React.useMemo(
        () => {
            const _selectedIngredients = [...selectedIngredients]

            return {
                bun: {
                    top: _selectedIngredients.shift(),
                    bottom: _selectedIngredients.pop(),
                },
                inside: _selectedIngredients,
            }
        },
        [selectedIngredients]
    )

    function handleShowModal() {
        setIsShowOrderDetails(true)
    }

    function handleCloseModal() {
        setIsShowOrderDetails(false)
    }

    function handleSendSubmitOrder() {
        const data = {
            ingredients: selectedIngredients.map(ingredient => ingredient._id)
        }

        sendSubmitOrder(data)
            .then(res => {
                if ( res.success === true ) {
                    setOrderNumber(res.order.number)
                    handleShowModal()
                } else {
                    setHasError(true)
                }
            })
            .catch(() => {
                setHasError(true)
            })
    }

    return <section className={`${styles.container} ${className}`}>
        <div className={styles.top}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${ingredientsData.bun.top.name} (верх)`}
                price={ingredientsData.bun.top.price}
                thumbnail={ingredientsData.bun.top.image}
            />
        </div>
        <div className={styles['list-wrap']}>
            <ul className={`${styles.list} custom-scroll`}>
                {ingredientsData.inside.map((item, i) =>
                    <li key={`${item._id}${i}`} className={styles.item}>
                        <button className={styles.dragger}>
                            <DragIcon type="primary"/>
                        </button>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </li>
                )}
            </ul>
        </div>
        <div className={styles.bottom}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${ingredientsData.bun.bottom.name} (низ)`}
                price={ingredientsData.bun.bottom.price}
                thumbnail={ingredientsData.bun.bottom.image}
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
            >
                Оформить заказ
            </Button>
        </div>
        {isShowOrderDetails && <Modal onClose={handleCloseModal}>
            <>
                {!hasError && <OrderDetails/>}
                {hasError && <p>К сожалению, в момент отправки заказа возникла ошибка.<br/>Попробуйте перезагрузить страницу и отправить заказ снова.</p>}
            </>
        </Modal>}
    </section>
}

BurgerConstructor.propTypes = {
    className: PropTypes.string,
}
