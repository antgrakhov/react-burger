import {historyOrdersReducer} from './history-orders'
import {
    HISTORY_ORDERS_CONNECTION_CLOSED,
    HISTORY_ORDERS_CONNECTION_ERROR,
    HISTORY_ORDERS_CONNECTION_GET_MESSAGE,
    HISTORY_ORDERS_CONNECTION_SUCCESS
} from '../actions/history-orders'
import {initialState} from './history-orders'

describe('history-orders reducer', () => {
    const testOrdersData = {
        orders: [
            {
                _id: "652fd83b52b4cf001d86b2de",
                ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa093d"],
                status: "done",
                name: "Space антарианский флюоресцентный бургер",
                createdAt: "2023-10-18T13:06:03.050Z",
                updatedAt: "2023-10-18T13:06:03.235Z",
                number: 23669
            },
            {
                _id: "652fd83752b4cf001d86b2dd",
                ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0943"],
                status: "done",
                name: "Space антарианский бургер",
                createdAt: "2023-10-18T13:05:59.593Z",
                updatedAt: "2023-10-18T13:05:59.886Z",
                number: 23668
            },
        ],
        total: 2,
        totalToday: 99
    }

    it('should return initial state', () => {
        expect(historyOrdersReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle HISTORY_ORDERS_CONNECTION_CLOSED', () => {
        expect(historyOrdersReducer({
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: null,
        }, {
            type: HISTORY_ORDERS_CONNECTION_CLOSED
        })).toEqual({
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: null,
        })
    })

    it('should handle HISTORY_ORDERS_CONNECTION_ERROR', () => {
        expect(historyOrdersReducer({
            ...initialState,
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
        }, {
            type: HISTORY_ORDERS_CONNECTION_ERROR,
            payload: new Event('test')
        })).toEqual({
            ...initialState,
            error: new Event('test'),
        })
    })

    it('should handle HISTORY_ORDERS_CONNECTION_GET_MESSAGE', () => {
        expect(historyOrdersReducer({
            ...initialState,
            wsConnected: true,
        }, {
            type: HISTORY_ORDERS_CONNECTION_GET_MESSAGE,
            payload: {
                orders: testOrdersData.orders,
                total: testOrdersData.total,
                totalToday: testOrdersData.totalToday,
            }
        })).toEqual({
            ...initialState,
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
        })
    })

    it('should handle HISTORY_ORDERS_CONNECTION_SUCCESS', () => {
        expect(historyOrdersReducer(initialState, {
            type: HISTORY_ORDERS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsConnected: true,
        })
    })
})