import React from 'react'
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import PropTypes from 'prop-types'
import {sendSubmitOrder} from '../../utils/burger-api'
import {BurgerConstructorContext} from '../../services/burger-constructor-context'

import styles from './burger-constructor.module.css'

export default function BurgerConstructor({className}) {
    const [isShowOrderDetails, setIsShowOrderDetails] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const {
        selectedIngredients,
        priceTotal,
        setOrderNumber
    } = React.useContext(BurgerConstructorContext)

    const ingredientsData = React.useMemo(
        () => {
            return {
                bun: selectedIngredients.filter(item => item.type === 'bun')[0],
                inside: selectedIngredients.filter(item => item.type !== 'bun')
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

    function handlesendSubmitOrder() {
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
                text={`${ingredientsData.bun.name} (верх)`}
                price={ingredientsData.bun.price}
                thumbnail={ingredientsData.bun.image}
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
                text={`${ingredientsData.bun.name} (низ)`}
                price={ingredientsData.bun.price}
                thumbnail={ingredientsData.bun.image}
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
                onClick={handlesendSubmitOrder}
            >
                Оформить заказ
            </Button>
        </div>
        {isShowOrderDetails && <Modal onClose={handleCloseModal}>
            {!hasError && <OrderDetails/>}
            {hasError && <p>К сожалению, в момент отправки заказа возникла ошибка.<br/>Попробуйте перезагрузить страницу и отправить заказ снова.</p>}
        </Modal>}
    </section>
}

BurgerConstructor.propTypes = {
    className: PropTypes.string,
}
