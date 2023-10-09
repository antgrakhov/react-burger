import {THistoryOrders} from '../../types'
import {TWebSocketActionTypes} from '../middlewares/websocket'

const HISTORY_ORDERS_CONNECTION_GET_MESSAGE = 'HISTORY_ORDERS/CONNECTION/GET_MESSAGE'
const HISTORY_ORDERS_CONNECTION_START = 'HISTORY_ORDERS/CONNECTION/START'
const HISTORY_ORDERS_CONNECTION_SUCCESS = 'HISTORY_ORDERS/CONNECTION/SUCCESS'
const HISTORY_ORDERS_CONNECTION_CONNECTING = 'HISTORY_ORDERS/CONNECTION/CONNECTING'
const HISTORY_ORDERS_CONNECTION_ERROR = 'HISTORY_ORDERS/CONNECTION/ERROR'
const HISTORY_ORDERS_CONNECTION_STOP = 'HISTORY_ORDERS/CONNECTION/STOP'
const HISTORY_ORDERS_CONNECTION_CLOSED = 'HISTORY_ORDERS/CONNECTION/CLOSED'

const historyOrdersActionTypes: TWebSocketActionTypes = {
    wsConnect: HISTORY_ORDERS_CONNECTION_START,
    wsDisconnect: HISTORY_ORDERS_CONNECTION_STOP,
    wsConnecting: HISTORY_ORDERS_CONNECTION_CONNECTING,
    onOpen: HISTORY_ORDERS_CONNECTION_SUCCESS,
    onClose: HISTORY_ORDERS_CONNECTION_CLOSED,
    onError: HISTORY_ORDERS_CONNECTION_ERROR,
    onMessage: HISTORY_ORDERS_CONNECTION_GET_MESSAGE
}

type THistoryOrdersConnectionStartAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_START
    payload: string
}

type THistoryOrdersConnectionStopAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_STOP
}

type THistoryOrdersConnectionConnectionAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_CONNECTING
}

type THistoryOrdersConnectionSuccessAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_SUCCESS
    payload: Event
}

type THistoryOrdersConnectionClosedAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_CLOSED
    payload: Event
}

type THistoryOrdersConnectionErrorAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_ERROR
    payload: Event
}

type THistoryOrdersConnectionMessageAction = {
    type: typeof HISTORY_ORDERS_CONNECTION_GET_MESSAGE
    payload: THistoryOrders
}

type THistoryOrdersActions = THistoryOrdersConnectionStartAction
    | THistoryOrdersConnectionStopAction
    | THistoryOrdersConnectionConnectionAction
    | THistoryOrdersConnectionSuccessAction
    | THistoryOrdersConnectionClosedAction
    | THistoryOrdersConnectionErrorAction
    | THistoryOrdersConnectionMessageAction

export {
    HISTORY_ORDERS_CONNECTION_GET_MESSAGE,
    HISTORY_ORDERS_CONNECTION_START,
    HISTORY_ORDERS_CONNECTION_SUCCESS,
    HISTORY_ORDERS_CONNECTION_CONNECTING,
    HISTORY_ORDERS_CONNECTION_ERROR,
    HISTORY_ORDERS_CONNECTION_STOP,
    HISTORY_ORDERS_CONNECTION_CLOSED,
    historyOrdersActionTypes,
    type THistoryOrdersConnectionStartAction,
    type THistoryOrdersConnectionStopAction,
    type THistoryOrdersConnectionConnectionAction,
    type THistoryOrdersConnectionSuccessAction,
    type THistoryOrdersConnectionClosedAction,
    type THistoryOrdersConnectionErrorAction,
    type THistoryOrdersConnectionMessageAction,
    type THistoryOrdersActions,
}