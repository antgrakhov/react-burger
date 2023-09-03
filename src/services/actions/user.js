import {
    getCookie,
    saveTokens,
} from '../../utils/cookies'
import {
    getUser,
    loginUser,
    registerUser,
} from '../../utils/api'

export const REGISTER_REQUEST = 'REGISTER/REQUEST'
export const REGISTER_SUCCESS = 'REGISTER/SUCCESS'
export const REGISTER_FAILED = 'REGISTER/FAILED'

export const LOGIN_REQUEST = 'LOGIN/REQUEST'
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS'
export const LOGIN_FAILED = 'LOGIN/FAILED'

export const GET_USER_REQUEST = 'USER/GET_REQUEST'
export const GET_USER_SUCCESS = 'USER/GET_SUCCESS'
export const GET_USER_FAILED = 'USER/GET_FAILED'

export const USER_SET = 'USER/SET'

export const AUTH_CHECKED = 'AUTH/CHECKED'

const registerUserAction = (form) => {
    return async function (dispatch) {
        let authToken

        dispatch({
            type: REGISTER_REQUEST
        })

        registerUser(form)
            .then(result => {
                dispatch({
                    type: REGISTER_SUCCESS
                })

                authToken = result.accessToken.split('Bearer ')[1]

                if (authToken) {
                    saveTokens(authToken, result.refreshToken)
                }

                dispatch({
                    type: USER_SET,
                    payload: result.user,
                })
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_FAILED,
                })
            })
    }
}

const loginUserAction = (form) => {
    return async function(dispatch) {
        let authToken

        dispatch({
            type: LOGIN_REQUEST
        })

        loginUser(form)
            .then(result => {
                dispatch({
                    type: LOGIN_SUCCESS
                })

                authToken = result.accessToken.split('Bearer ')[1]

                if (authToken) {
                    saveTokens(authToken, result.refreshToken)
                }

                dispatch({
                    type: USER_SET,
                    payload: result.user,
                })
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILED
                })
            })
    }
}

const checkUserAuth = () => {
    return async function(dispatch) {
        if ( getCookie('accessToken') ) {
            dispatch(getUserAction()).finally(() => {
                dispatch({
                    type: AUTH_CHECKED,
                    payload: true
                })
            })
        } else {
            dispatch({
                type: AUTH_CHECKED,
                payload: true
            })
        }
    }
}

const getUserAction = () => {
    return async function(dispatch) {
        try {
            dispatch({
                type: GET_USER_REQUEST
            })

            const fetchData = await getUser()

            dispatch({
                type: GET_USER_SUCCESS
            })

            dispatch({
                type: USER_SET,
                payload: fetchData.user,
            })
        }
        catch(err) {
            dispatch({
                type: GET_USER_FAILED
            })
        }
    }
}

export {
    registerUserAction,
    loginUserAction,
    checkUserAuth,
    getUserAction,
}
