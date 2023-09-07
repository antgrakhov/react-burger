import {
    resetPassword,
    forgotPassword
} from '../../utils/api'

const RESET_PASSWORD_REQUEST = 'PASSWORD/RESET_REQUEST'
const RESET_PASSWORD_SUCCESS = 'PASSWORD/RESET_SUCCESS'
const RESET_PASSWORD_FAILED = 'PASSWORD/RESET_FAILED'
const FORGOT_PASSWORD_REQUEST = 'PASSWORD/FORGOT_REQUEST'
const FORGOT_PASSWORD_SUCCESS = 'PASSWORD/FORGOT_SUCCESS'
const FORGOT_PASSWORD_FAILED = 'PASSWORD/FORGOT_FAILED'

const forgotPasswordAction = (email) => {
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

const resetPasswordAction = (password, token) => {
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
}
