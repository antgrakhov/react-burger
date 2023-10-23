import {orderViewReducer} from './order-view'
import {
    GET_ORDER_VIEW_REQUEST,
    GET_ORDER_VIEW_SUCCESS,
    GET_ORDER_VIEW_FAILED
} from '../actions/order-view'
import {initialState} from './order-view'

describe('order-view reducer', () => {
    const testOrders = [
        {
            _id: "652361ee6d2997001caae3ee",
            ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0942", "643d69a5c3f7b9001cfa0944", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa093c"],
            owner: "64ef3ee682e277001bfac29f",
            status: "done",
            name: "Spicy экзо-плантаго традиционный-галактический антарианский краторный бургер",
            createdAt: "2023-10-09T02:14:06.536Z",
            updatedAt: "2023-10-09T02:14:06.807Z",
            number: 22642,
            __v: 0
        }
    ]

    it('should return initial state', () => {
        expect(orderViewReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_ORDER_VIEW_REQUEST', () => {
        expect(orderViewReducer(initialState, {
            type: GET_ORDER_VIEW_REQUEST
        })).toEqual({
            ...initialState,
            orderViewRequest: true,
            orderViewFailed: false
        })
    })

    it('should handle GET_ORDER_VIEW_SUCCESS', () => {
        expect(orderViewReducer({
            ...initialState,
            orderViewRequest: true
        }, {
            type: GET_ORDER_VIEW_SUCCESS,
            payload: testOrders
        })).toEqual({
            ...initialState,
            orders: testOrders,
            orderViewRequest: false,
        })
    })

    it('should handle GET_ORDER_VIEW_FAILED', () => {
        expect(orderViewReducer({
            ...initialState,
            orderViewRequest: true
        }, {
            type: GET_ORDER_VIEW_FAILED
        })).toEqual({
            ...initialState,
            orders: [],
            orderViewRequest: false,
            orderViewFailed: true
        })
    })
})