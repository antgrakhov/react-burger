import {
    getCookie,
    saveTokens,
    deleteCookie,
} from '../../utils/cookies'
import {
    getUser,
    loginUser,
    updateUser,
    logoutUser,
    registerUser,
} from '../../utils/api'

const REGISTER_REQUEST = 'REGISTER/REQUEST'
const REGISTER_SUCCESS = 'REGISTER/SUCCESS'
const REGISTER_FAILED = 'REGISTER/FAILED'

const LOGIN_REQUEST = 'LOGIN/REQUEST'
const LOGIN_SUCCESS = 'LOGIN/SUCCESS'
const LOGIN_FAILED = 'LOGIN/FAILED'

const GET_USER_REQUEST = 'USER/GET_REQUEST'
const GET_USER_SUCCESS = 'USER/GET_SUCCESS'
const GET_USER_FAILED = 'USER/GET_FAILED'

const USER_PATCH_REQUEST = 'USER/PATCH_REQUEST'
const USER_PATCH_SUCCESS = 'USER/PATCH_SUCCESS'
const USER_PATCH_FAILED = 'USER/PATCH_FAILED'

const LOGOUT_REQUEST = 'USER/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'USER/LOGOUT_SUCCESS'
const LOGOUT_FAILED = 'USER/LOGOUT_FAILED'


const USER_SET = 'USER/SET'
const USER_UPDATE = 'USER/UPDATE'

const AUTH_CHECKED = 'AUTH/CHECKED'

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

const updateUserAction = (form) => {
    return async function(dispatch) {
        try {
            dispatch({
                type: USER_PATCH_REQUEST
            })

            const fetchData = await updateUser(form)

            dispatch({
                type: USER_PATCH_SUCCESS
            })

            dispatch({
                type: USER_UPDATE,
                payload: fetchData.user,
            })
        }
        catch(err) {
            dispatch({
                type: USER_PATCH_FAILED
            })

            throw 'patch user err'
        }
    }
}

const logoutUserAction = () => {
    return async function(dispatch) {
        try {
            dispatch({
                type: LOGOUT_REQUEST
            })

            await logoutUser()

            dispatch({
                type: LOGOUT_SUCCESS
            })

            deleteCookie('accessToken')
            localStorage.removeItem('refreshToken')
        }
        catch {
            dispatch({
                type: LOGOUT_FAILED
            })
            // eslint-disable-next-line no-throw-literal
            throw 'logout fetch error'
        }
    }
}

export {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    USER_PATCH_REQUEST,
    USER_PATCH_SUCCESS,
    USER_PATCH_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    USER_UPDATE,
    USER_SET,
    AUTH_CHECKED,
    registerUserAction,
    updateUserAction,
    logoutUserAction,
    loginUserAction,
    checkUserAuth,
    getUserAction,
}
