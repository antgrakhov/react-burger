import {TOrderData} from '../../types'
import {
    FEED_ORDERS_CONNECTION_CLOSED,
    FEED_ORDERS_CONNECTION_ERROR,
    FEED_ORDERS_CONNECTION_SUCCESS,
    FEED_ORDERS_CONNECTION_GET_MESSAGE,
    TFeedOrdersActions
} from '../actions/feed-orders'

type TFeedOrdersState = {
    wsConnected: boolean
    orders: TOrderData[] | []
    total: number
    totalToday: number
    error?: Event | null
}

const initialState: TFeedOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
}

const feedOrdersReducer = (state: TFeedOrdersState = initialState, action: TFeedOrdersActions): TFeedOrdersState => {
    switch (action.type) {
        case FEED_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: null,
                wsConnected: true,
            }
        }
        case FEED_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                error: action.payload,
                wsConnected: false,
            }
        }
        case FEED_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                error: null,
                wsConnected: false,
            }
        }
        case FEED_ORDERS_CONNECTION_GET_MESSAGE: {
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
    type TFeedOrdersState,
    initialState,
    feedOrdersReducer,
}