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
import {TAppThunk} from '../../types/store'
import {TUseForm} from '../../utils/use-form'
import {TUserData} from '../../types'

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

type TRegisterRequest = {
    type: typeof REGISTER_REQUEST
}

type TRegisterSuccess = {
    type: typeof REGISTER_SUCCESS
}

type TRegisterFailed = {
    type: typeof REGISTER_FAILED
}

type TLoginRequest = {
    type: typeof LOGIN_REQUEST
}

type TLoginSuccess = {
    type: typeof LOGIN_SUCCESS
}

type TLoginFailed = {
    type: typeof LOGIN_FAILED
}

type TGetUserRequest = {
    type: typeof GET_USER_REQUEST
}

type TGetUserSuccess = {
    type: typeof GET_USER_SUCCESS
}

type TGetUserFailed = {
    type: typeof GET_USER_FAILED
}

type TUserPatchRequest = {
    type: typeof USER_PATCH_REQUEST
}

type TUserPatchSuccess = {
    type: typeof USER_PATCH_SUCCESS
}

type TUserPatchFailed = {
    type: typeof USER_PATCH_FAILED
}

type TLogoutRequest = {
    type: typeof LOGOUT_REQUEST
}

type TLogoutSuccess = {
    type: typeof LOGOUT_SUCCESS
}

type TLogoutFailed = {
    type: typeof LOGOUT_FAILED
}

type TUserSet = {
    type: typeof USER_SET
    payload: TUserData
}

type TUserUpdate = {
    type: typeof USER_UPDATE
    payload: TUserData
}

type TAuthChecked = {
    type: typeof AUTH_CHECKED
    payload: boolean
}

type TUserActions = TRegisterRequest
    | TRegisterSuccess
    | TRegisterFailed
    | TLoginRequest
    | TLoginSuccess
    | TLoginFailed
    | TGetUserRequest
    | TGetUserSuccess
    | TGetUserFailed
    | TUserPatchRequest
    | TUserPatchSuccess
    | TUserPatchFailed
    | TLogoutRequest
    | TLogoutSuccess
    | TLogoutFailed
    | TUserSet
    | TUserUpdate
    | TAuthChecked

const registerUserAction: TAppThunk = (form: TUseForm) => {
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

const loginUserAction: TAppThunk = (form: TUseForm) => {
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

const checkUserAuth: TAppThunk = () => {
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

const getUserAction: TAppThunk = () => {
    return async function(dispatch) {
        try {
            dispatch({
                type: GET_USER_REQUEST
            })

            const fetchData = await getUser()

            dispatch({
                type: GET_USER_SUCCESS
            })

            if (fetchData) {
                dispatch({
                    type: USER_SET,
                    payload: fetchData.user,
                })
            }
        }
        catch(err) {
            dispatch({
                type: GET_USER_FAILED
            })
        }
    }
}

const updateUserAction: TAppThunk = (form: TUseForm) => {
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
        }
    }
}

const logoutUserAction: TAppThunk = () => {
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
    type TRegisterRequest,
    type TRegisterSuccess,
    type TRegisterFailed,
    type TLoginRequest,
    type TLoginSuccess,
    type TLoginFailed,
    type TGetUserRequest,
    type TGetUserSuccess,
    type TGetUserFailed,
    type TUserPatchRequest,
    type TUserPatchSuccess,
    type TUserPatchFailed,
    type TLogoutRequest,
    type TLogoutSuccess,
    type TLogoutFailed,
    type TUserSet,
    type TUserUpdate,
    type TAuthChecked,
    type TUserActions,
}
