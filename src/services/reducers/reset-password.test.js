import {resetPasswordReducer} from './reset-password'
import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED
} from '../actions/reset-password'
import {initialState} from './reset-password'

describe('reset-password reducer', () => {
    it('should return initial state', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false,
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer({
            ...initialState,
            resetPasswordRequest: true,
        }, {
            type: RESET_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: false
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer({
            ...initialState,
            resetPasswordRequest: true,
        }, {
            type: RESET_PASSWORD_FAILED,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
            forgotPasswordFailed: false,
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer({
            ...initialState,
            forgotPasswordRequest: true,
        }, {
            type: FORGOT_PASSWORD_SUCCESS,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false
        })
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer({
            ...initialState,
            forgotPasswordRequest: true,
        }, {
            type: FORGOT_PASSWORD_FAILED,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true,
        })
    })
})
