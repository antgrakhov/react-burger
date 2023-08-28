import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    SHOW_ORDER_MODAL,
    HIDE_ORDER_MODAL
} from '../actions/order'

const initialState = {
    orderNumber: 0,
    orderRequest: false,
    orderFailed: false,
    isShowModalOrder: false,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload.orderNumber,
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