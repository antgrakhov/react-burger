import {
    resetPassword,
    forgotPassword
} from '../../utils/api'
import {TAppThunk} from '../../types/store'

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

const forgotPasswordAction: TAppThunk = (email: string) => {
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

const resetPasswordAction: TAppThunk = (password: string, token: string) => {
    return async (dispatch) => {
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
