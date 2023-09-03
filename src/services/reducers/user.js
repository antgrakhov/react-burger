import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_SET,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_CHECKED,
} from '../actions/user'

const initialState = {
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    patchUserRequest: false,
    patchUserSuccess: false,
    patchUserFailed: false,
    isAuthChecked: false,
    user: {
        name: '',
        email: '',
        password: '',
        isLogged: false
    },
}

export const userReducer = (state = initialState, action) => {
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
                registerFailed: false,
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
                loginFailed: false,
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
        case USER_SET: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    isLogged: true,
                },
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