import {TFeedOrders} from '../../types'
import {TWebSocketActionTypes} from '../middlewares/websocket'

const FEED_ORDERS_CONNECTION_GET_MESSAGE = 'FEED_ORDERS/CONNECTION/GET_MESSAGE'
const FEED_ORDERS_CONNECTION_START = 'FEED_ORDERS/CONNECTION/START'
const FEED_ORDERS_CONNECTION_SUCCESS = 'FEED_ORDERS/CONNECTION/SUCCESS'
const FEED_ORDERS_CONNECTION_CONNECTING = 'FEED_ORDERS/CONNECTION/CONNECTING'
const FEED_ORDERS_CONNECTION_ERROR = 'FEED_ORDERS/CONNECTION/ERROR'
const FEED_ORDERS_CONNECTION_STOP = 'FEED_ORDERS/CONNECTION/STOP'
const FEED_ORDERS_CONNECTION_CLOSED = 'FEED_ORDERS/CONNECTION/CLOSED'

const feedOrdersActionTypes: TWebSocketActionTypes = {
    wsConnect: FEED_ORDERS_CONNECTION_START,
    wsDisconnect: FEED_ORDERS_CONNECTION_STOP,
    wsConnecting: FEED_ORDERS_CONNECTION_CONNECTING,
    onOpen: FEED_ORDERS_CONNECTION_SUCCESS,
    onClose: FEED_ORDERS_CONNECTION_CLOSED,
    onError: FEED_ORDERS_CONNECTION_ERROR,
    onMessage: FEED_ORDERS_CONNECTION_GET_MESSAGE
}

type TFeedOrdersConnectionStartAction = {
    type: typeof FEED_ORDERS_CONNECTION_START
    payload: string
}

type TFeedOrdersConnectionStopAction = {
    type: typeof FEED_ORDERS_CONNECTION_STOP
}

type TFeedOrdersConnectionConnectionAction = {
    type: typeof FEED_ORDERS_CONNECTION_CONNECTING
}

type TFeedOrdersConnectionSuccessAction = {
    type: typeof FEED_ORDERS_CONNECTION_SUCCESS
    payload: Event
}

type TFeedOrdersConnectionClosedAction = {
    type: typeof FEED_ORDERS_CONNECTION_CLOSED
    payload: Event
}

type TFeedOrdersConnectionErrorAction = {
    type: typeof FEED_ORDERS_CONNECTION_ERROR
    payload: Event
}

type TFeedOrdersConnectionMessageAction = {
    type: typeof FEED_ORDERS_CONNECTION_GET_MESSAGE
    payload: TFeedOrders
}

type TFeedOrdersActions = TFeedOrdersConnectionStartAction
| TFeedOrdersConnectionStopAction
| TFeedOrdersConnectionConnectionAction
| TFeedOrdersConnectionSuccessAction
| TFeedOrdersConnectionClosedAction
| TFeedOrdersConnectionErrorAction
| TFeedOrdersConnectionMessageAction

export {
    FEED_ORDERS_CONNECTION_GET_MESSAGE,
    FEED_ORDERS_CONNECTION_START,
    FEED_ORDERS_CONNECTION_SUCCESS,
    FEED_ORDERS_CONNECTION_CONNECTING,
    FEED_ORDERS_CONNECTION_ERROR,
    FEED_ORDERS_CONNECTION_STOP,
    FEED_ORDERS_CONNECTION_CLOSED,
    feedOrdersActionTypes,
    type TFeedOrdersConnectionStartAction,
    type TFeedOrdersConnectionStopAction,
    type TFeedOrdersConnectionConnectionAction,
    type TFeedOrdersConnectionSuccessAction,
    type TFeedOrdersConnectionClosedAction,
    type TFeedOrdersConnectionErrorAction,
    type TFeedOrdersConnectionMessageAction,
    type TFeedOrdersActions,
}