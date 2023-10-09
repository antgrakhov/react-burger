import {
    GET_ORDER_VIEW_REQUEST,
    GET_ORDER_VIEW_SUCCESS,
    GET_ORDER_VIEW_FAILED,
    TGetOrderViewActions
} from '../actions/order-view'
import {TOrderData} from '../../types'

type TOrderViewState = {
    orders: TOrderData[],
    orderViewRequest: boolean
    orderViewFailed: boolean
}

const initialState: TOrderViewState = {
    orders: [],
    orderViewRequest: false,
    orderViewFailed: false,
}

export const orderViewReducer = (state: TOrderViewState = initialState, action: TGetOrderViewActions): TOrderViewState => {
    switch (action.type) {
        case GET_ORDER_VIEW_REQUEST: {
            return {
                ...state,
                orderViewRequest: true,
                orderViewFailed: false
            }
        }

        case GET_ORDER_VIEW_SUCCESS: {
            return {
                ...state,
                orders: action.payload,
                orderViewRequest: false,
                orderViewFailed: false,
            }
        }

        case GET_ORDER_VIEW_FAILED: {
            return {
                ...state,
                orders: [],
                orderViewRequest: false,
                orderViewFailed: true,
            }
        }

        default:
            return state;
    }
}