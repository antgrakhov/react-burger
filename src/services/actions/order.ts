import {submitOrder} from '../../utils/api'
import {TAppThunk} from '../../types/store'

const SEND_ORDER_REQUEST = 'ORDER/SEND_REQUEST'
const SEND_ORDER_SUCCESS = 'ORDER/SEND_SUCCESS'
const SEND_ORDER_FAILED = 'ORDER/SEND_FAILED'
const SHOW_ORDER_MODAL = 'ORDER/SHOW_MODAL'
const HIDE_ORDER_MODAL = 'ORDER/HIDE_MODAL'

type TSendOrderRequest = {
    type: typeof SEND_ORDER_REQUEST
}

type TSendOrderSuccess = {
    type: typeof SEND_ORDER_SUCCESS,
    payload: number
}

type TSendOrderFailed = {
    type: typeof SEND_ORDER_FAILED
}

type TShowOrderModal = {
    type: typeof SHOW_ORDER_MODAL
}

type THideOrderModal = {
    type: typeof HIDE_ORDER_MODAL
}

type TSendOrderActions = TSendOrderRequest
    | TSendOrderSuccess
    | TSendOrderFailed
    | TShowOrderModal
    | THideOrderModal

type TSendSubmitOrder = {
    ingredients: string[]
}

const sendSubmitOrder: TAppThunk = (items: TSendSubmitOrder) => {
    return async function (dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })

        submitOrder(items)
            .then(result => {
               dispatch({
                   type: SEND_ORDER_SUCCESS,
                   payload: result.order.number
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
    sendSubmitOrder,
    type TSendSubmitOrder,
    type TSendOrderRequest,
    type TSendOrderSuccess,
    type TShowOrderModal,
    type THideOrderModal,
    type TSendOrderActions,
}