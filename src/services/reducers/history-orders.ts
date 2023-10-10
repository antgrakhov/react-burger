import {TOrderData} from '../../types'
import {
    HISTORY_ORDERS_CONNECTION_CLOSED,
    HISTORY_ORDERS_CONNECTION_ERROR,
    HISTORY_ORDERS_CONNECTION_GET_MESSAGE,
    HISTORY_ORDERS_CONNECTION_SUCCESS,
    THistoryOrdersActions
} from '../actions/history-orders';

type THistoryOrdersState = {
    wsConnected: boolean
    orders: TOrderData[] | []
    total: number
    totalToday: number
    error?: Event | null
}

const initialState: THistoryOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
}

const historyOrdersReducer = (state: THistoryOrdersState = initialState, action: THistoryOrdersActions): THistoryOrdersState => {
    switch (action.type) {
        case HISTORY_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: null,
                wsConnected: true,
            }
        }
        case HISTORY_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                orders: [],
                error: action.payload,
                wsConnected: false,
            }
        }
        case HISTORY_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
                orders: [],
                error: null,
                wsConnected: false,
            }
        }
        case HISTORY_ORDERS_CONNECTION_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }
        default: {
            return state
        }
    }
}

export {
    type THistoryOrdersState,
    historyOrdersReducer,
}