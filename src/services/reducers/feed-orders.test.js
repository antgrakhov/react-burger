import {feedOrdersReducer} from './feed-orders'
import {
    FEED_ORDERS_CONNECTION_GET_MESSAGE,
    FEED_ORDERS_CONNECTION_SUCCESS,
    FEED_ORDERS_CONNECTION_ERROR,
    FEED_ORDERS_CONNECTION_CLOSED,
} from '../actions/feed-orders'
import {initialState} from './feed-orders'

describe('feed-orders reducer', () => {
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
        expect(feedOrdersReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FEED_ORDERS_CONNECTION_GET_MESSAGE', () => {
        expect(feedOrdersReducer({
            ...initialState,
            wsConnected: true,
        }, {
            type: FEED_ORDERS_CONNECTION_GET_MESSAGE,
            payload: testOrdersData,
        })).toEqual({
            ...initialState,
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
        })
    })

    it('should handle FEED_ORDERS_CONNECTION_SUCCESS', () => {
        expect(feedOrdersReducer(initialState, {
            type: FEED_ORDERS_CONNECTION_SUCCESS,
            payload: new Event('test'),
        })).toEqual({
            ...initialState,
            wsConnected: true,
        })
    })

    it('should handle FEED_ORDERS_CONNECTION_ERROR', () => {
        expect(feedOrdersReducer({
            ...initialState,
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
        }, {
            type: FEED_ORDERS_CONNECTION_ERROR,
            payload: new Event('test')
        })).toEqual({
            ...initialState,
            error: new Event('test')
        })
    })

    it('should handle FEED_ORDERS_CONNECTION_CLOSED', () => {
        expect(feedOrdersReducer({
            ...initialState,
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
        }, {
            type: FEED_ORDERS_CONNECTION_CLOSED,
        })).toEqual(initialState)
    })
})