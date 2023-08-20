import {submitOrder} from '../../utils/burger-api'

const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST'
const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED'
const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL'
const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL'

const sendSubmitOrder = (items) => {
    return async function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })

        submitOrder(items)
            .then(result => {
                let action = {
                    type: SEND_ORDER_FAILED
                }

                if ( result.success === true ) {
                    action = {
                        type: SEND_ORDER_SUCCESS,
                        orderNumber: result.order.number
                    }
                }

                dispatch(action)
            })
            .catch(() => {
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
}

export {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    SHOW_ORDER_MODAL,
    HIDE_ORDER_MODAL,
    sendSubmitOrder
}