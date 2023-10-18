import {userReducer} from './user'
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
    USER_UPDATE
} from '../actions/user'
import {initialState} from './user'

describe('user reducer', () => {
    const testUser = {
        name: 'John Smith',
        email: 'john@smi.th',
    }
    const testIsAuthChecked = true

    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            registerRequest: true,
            registerFailed: false
        })
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            registerRequest: true
        }, {
            type: REGISTER_SUCCESS
        })).toEqual({
            ...initialState,
            registerRequest: false,
            isAuthChecked: true
        })
    })

    it('should handle REGISTER_FAILED', () => {
        expect(userReducer({
            ...initialState,
            registerRequest: true
        }, {
            type: REGISTER_FAILED
        })).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true
        })
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false
        })
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            loginRequest: true
        }, {
            type: LOGIN_SUCCESS
        })).toEqual({
            ...initialState,
            loginRequest: false,
            isAuthChecked: true
        })
    })

    it('should handle LOGIN_FAILED', () => {
        expect(userReducer({
            ...initialState,
            loginRequest: true
        }, {
            type: LOGIN_FAILED
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true
        })
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(userReducer(initialState, {
            type: LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            logoutRequest: true,
            logoutFailed: false
        })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            user: testUser,
            logoutRequest: true
        }, {
            type: LOGOUT_SUCCESS
        })).toEqual({
            ...initialState,
            user: {
                ...initialState.user
            },
            logoutRequest: false
        })
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(userReducer({
            ...initialState,
            logoutRequest: true
        }, {
            type: LOGOUT_FAILED
        })).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: true
        })
    })

    it('should handle USER_SET', () => {
        expect(userReducer(initialState,
        {
            type: USER_SET,
            payload: testUser
        })).toEqual({
            ...initialState,
            user: {
                ...testUser,
            },
            isLogged: true
        })
    })

    it('should handle USER_PATCH_REQUEST', () => {
        expect(userReducer(initialState, {
            type: USER_PATCH_REQUEST
        })).toEqual({
            ...initialState,
            patchUserRequest: true,
            patchUserFailed: false
        })
    })

    it('should handle USER_PATCH_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            patchUserRequest: true
        }, {
            type: USER_PATCH_SUCCESS
        })).toEqual({
            ...initialState,
            patchUserRequest: false
        })
    })

    it('should handle USER_PATCH_FAILED', () => {
        expect(userReducer({
            ...initialState,
            patchUserRequest: true
        }, {
            type: USER_PATCH_FAILED
        })).toEqual({
            ...initialState,
            patchUserRequest: false,
            patchUserFailed: true
        })
    })

    it('should handle USER_UPDATE', () => {
        expect(userReducer(initialState,
        {
            type: USER_UPDATE,
            payload: testUser
        })).toEqual({
            ...initialState,
            user: {
                ...testUser
            }
        })
    })

    it('should handle AUTH_CHECKED', () => {
        expect(userReducer(initialState,
            {
                type: AUTH_CHECKED,
                payload: testIsAuthChecked
            })).toEqual({
            ...initialState,
            isAuthChecked: testIsAuthChecked
        })
    })
})