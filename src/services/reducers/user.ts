import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    AUTH_CHECKED,
    USER_PATCH_REQUEST,
    USER_PATCH_SUCCESS,
    USER_PATCH_FAILED,
    USER_SET,
    USER_UPDATE,
    TUserActions,
} from '../actions/user'
import {TUserData} from '../../types'

type TUserState = {
    registerRequest: boolean
    registerFailed: boolean
    loginRequest: boolean
    loginFailed: boolean
    logoutRequest: boolean
    logoutFailed: boolean
    getUserRequest: boolean
    getUserFailed: boolean
    patchUserRequest: boolean
    patchUserFailed: boolean
    isAuthChecked: boolean
    isLogged: boolean
    user: TUserData
}

const initialState: TUserState = {
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    patchUserRequest: false,
    patchUserFailed: false,
    isAuthChecked: false,
    isLogged: false,
    user: {
        name: '',
        email: '',
    },
}
const userReducer = (state: TUserState = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                isAuthChecked: true,
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                isAuthChecked: true,
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                user: {
                    ...initialState.user,
                },
                logoutRequest: false,
                logoutFailed: false,
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }
        case USER_SET: {
            return {
                ...state,
                user: {
                    ...action.payload,
                },
                isLogged: true,
            }
        }
        case USER_PATCH_REQUEST: {
            return {
                ...state,
                patchUserRequest: true,
                patchUserFailed: false,
            }
        }
        case USER_PATCH_SUCCESS: {
            return {
                ...state,
                patchUserRequest: false,
            }
        }
        case USER_PATCH_FAILED: {
            return {
                ...state,
                patchUserRequest: false,
                patchUserFailed: true,
            }
        }
        case USER_UPDATE: {
            return {
                ...state,
                user: {
                    ...action.payload,
                }
            }
        }
        case AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export {
    userReducer,
    initialState
}