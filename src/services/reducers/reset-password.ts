import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED, TResetForgotPasswordActions,
} from '../actions/reset-password'

type TResetPasswordState = {
    forgotPasswordRequest: boolean
    forgotPasswordFailed: boolean
    resetPasswordRequest: boolean
    resetPasswordFailed: boolean
}

const initialState: TResetPasswordState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
}

const resetPasswordReducer = (state: TResetPasswordState = initialState, action: TResetForgotPasswordActions): TResetPasswordState => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
            }
        }
        default: {
            return state
        }
    }
}

export {
    resetPasswordReducer,
    initialState
}