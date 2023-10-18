import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    SHOW_ORDER_MODAL,
    HIDE_ORDER_MODAL,
    TSendOrderActions
} from '../actions/order'

type TOrderState = {
    orderNumber: number
    orderRequest: boolean
    orderFailed: boolean
    isShowModalOrder: boolean
}

const initialState: TOrderState = {
    orderNumber: 0,
    orderRequest: false,
    orderFailed: false,
    isShowModalOrder: false,
}

const orderReducer = (state: TOrderState = initialState, action: TSendOrderActions): TOrderState => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderNumber: 0,
                orderRequest: true,
                orderFailed: false,
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload,
                orderRequest: false,
                orderFailed: false,
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            }
        }
        case SHOW_ORDER_MODAL: {
            return {
                ...state,
                isShowModalOrder: true
            }
        }
        case HIDE_ORDER_MODAL: {
            return {
                ...state,
                isShowModalOrder: false
            }
        }
        default: {
            return state
        }
    }
}

export {
    initialState,
    orderReducer
}