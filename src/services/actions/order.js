import {submitOrder} from '../../utils/burger-api'

const SEND_ORDER_REQUEST = 'ORDER/SEND_REQUEST'
const SEND_ORDER_SUCCESS = 'ORDER/SEND_SUCCESS'
const SEND_ORDER_FAILED = 'ORDER/SEND_FAILED'
const SHOW_ORDER_MODAL = 'ORDER/SHOW_MODAL'
const HIDE_ORDER_MODAL = 'ORDER/HIDE_MODAL'

const sendSubmitOrder = (items) => {
    return async function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })

        submitOrder(items)
            .then(result => {
               dispatch({
                   type: SEND_ORDER_SUCCESS,
                   payload: {
                       orderNumber: result.order.number
                   }
               })
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