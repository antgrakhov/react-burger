import {
    resetPassword,
    forgotPassword
} from '../../utils/api'
import {TAppDispatch} from '../../types/store'

const RESET_PASSWORD_REQUEST = 'PASSWORD/RESET_REQUEST'
const RESET_PASSWORD_SUCCESS = 'PASSWORD/RESET_SUCCESS'
const RESET_PASSWORD_FAILED = 'PASSWORD/RESET_FAILED'
const FORGOT_PASSWORD_REQUEST = 'PASSWORD/FORGOT_REQUEST'
const FORGOT_PASSWORD_SUCCESS = 'PASSWORD/FORGOT_SUCCESS'
const FORGOT_PASSWORD_FAILED = 'PASSWORD/FORGOT_FAILED'

type TResetPasswordRequest = {
    type: typeof RESET_PASSWORD_REQUEST
}

type TResetPasswordSuccess = {
    type: typeof RESET_PASSWORD_SUCCESS
}

type TResetPasswordFailed = {
    type: typeof RESET_PASSWORD_FAILED
}

type TForgotPasswordRequest = {
    type: typeof FORGOT_PASSWORD_REQUEST
}

type TForgotPasswordSuccess = {
    type: typeof FORGOT_PASSWORD_SUCCESS
}

type TForgotPasswordFailed = {
    type: typeof FORGOT_PASSWORD_FAILED
}

type TResetForgotPasswordActions = TResetPasswordRequest
    | TResetPasswordSuccess
    | TResetPasswordFailed
    | TForgotPasswordRequest
    | TForgotPasswordSuccess
    | TForgotPasswordFailed

const forgotPasswordAction = (email: string): (dispatch: TAppDispatch) => Promise<void> => {
    return async function(dispatch) {
        try {
            dispatch({
                type: FORGOT_PASSWORD_REQUEST
            })
            await forgotPassword(email)

            dispatch({
                type: FORGOT_PASSWORD_SUCCESS
            })
        }
        catch(e) {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })

            // eslint-disable-next-line no-throw-literal
            throw 'forgot password error'
        }
    }
}

const resetPasswordAction = (password: string, token: string): (dispatch: TAppDispatch) => Promise<void> => {
    return async (dispatch: TAppDispatch) => {
        try {
            dispatch({
                type: RESET_PASSWORD_REQUEST
            })

            await resetPassword(
                password,
                token
            )

            dispatch({
                type: RESET_PASSWORD_SUCCESS
            })
        }
        catch(e) {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })

            // eslint-disable-next-line no-throw-literal
            throw 'reset password error'
        }

    }
}

export {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    forgotPasswordAction,
    resetPasswordAction,
    type TResetPasswordRequest,
    type TResetPasswordSuccess,
    type TResetPasswordFailed,
    type TForgotPasswordRequest,
    type TForgotPasswordSuccess,
    type TForgotPasswordFailed,
    type TResetForgotPasswordActions,
}
