import {orderReducer} from './order'
import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    SHOW_ORDER_MODAL,
    HIDE_ORDER_MODAL
} from '../actions/order'
import {initialState} from './order'

describe('order reducer', () => {
    const orderNumber = 1234

    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SEND_ORDER_REQUEST', () => {
        expect(orderReducer({
            ...initialState,
            orderNumber
        }, {
            type: SEND_ORDER_REQUEST,
        })).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(orderReducer({
            ...initialState,
            orderRequest: true
        }, {
            type: SEND_ORDER_SUCCESS,
            payload: orderNumber
        })).toEqual({
            ...initialState,
            orderNumber: orderNumber,
            orderRequest: false
        })
    })

    it('should handle SEND_ORDER_FAILED', () => {
        expect(orderReducer({
            ...initialState,
            orderRequest: true
        }, {
            type: SEND_ORDER_FAILED,
            payload: orderNumber
        })).toEqual({
            ...initialState,
            orderFailed: true,
            orderRequest: false
        })
    })

    it('should handle SHOW_ORDER_MODAL', () => {
        expect(orderReducer(initialState, {
            type: SHOW_ORDER_MODAL
        })).toEqual({
            ...initialState,
            isShowModalOrder: true
        })
    })

    it('should handle HIDE_ORDER_MODAL', () => {
        expect(orderReducer(initialState, {
            type: HIDE_ORDER_MODAL
        })).toEqual({
            ...initialState,
            isShowModalOrder: false
        })
    })
})