import {getCookie, saveTokens} from './cookies'
import {TIngredient, TUserUpdateForm} from '../types'

const BASE_URL = 'https://norma.nomoreparties.space/api'

type TServerResponse<T> = {
    success: boolean
} & T

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[]
}>

type TOrderResponse = TServerResponse<{
    name: string
    order: {
        number: number
    }
}>

type TMessageResponse = TServerResponse<{
    message: string
}>

type TGetUserResponse = TServerResponse<{
    user: {
        email: string
        name: string
    }
}>

type TGetUserWithCredsResponse = TServerResponse<{
    user: {
        email: string
        name: string
    }
    accessToken: string
    refreshToken: string
}>

type TGetRefreshToken = TServerResponse<{
    refreshToken: string
    accessToken: string
}>

type TRegisterUser = {
    name: string
    email: string
    password: string
}

type TLoginUser = {
    email: string
    password: string
}

const loadIngredients = (): Promise<TIngredientsResponse> => {
    return request<TIngredientsResponse>('/ingredients')
}

const submitOrder = (data: string[]): Promise<TOrderResponse> => {
    return request<TOrderResponse>('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

const registerUser = (form: TRegisterUser): Promise<TGetUserWithCredsResponse> => {
    return request<TGetUserWithCredsResponse>('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const loginUser = (form: TLoginUser): Promise<TGetUserWithCredsResponse> => {
    return request<TGetUserWithCredsResponse>('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const getUser = () => {
    return requestWithRefresh<TGetUserResponse>('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
    })
}

const updateUser = (form: TUserUpdateForm): Promise<TGetUserResponse> => {
    return request<TGetUserResponse>('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    })
}

const logoutUser = (): Promise<TMessageResponse> => {
    return request<TMessageResponse>('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

const forgotPassword = (email: string): Promise<TMessageResponse> => {
    return request<TMessageResponse>('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    })
}

const resetPassword = (password: string, token: string): Promise<TMessageResponse> => {
    return request<TMessageResponse>('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password,
            token
        })
    })
}

const requestWithRefresh = async <T>(endpoint: RequestInfo, options: RequestInit) => {
    try {
        return await request<T>(endpoint, options)
    } catch (error) {
        if ( error === 403 ) {
            let authToken

            const {
                accessToken,
                refreshToken
            } = await getRefreshToken()

            authToken = accessToken.split('Bearer ')[1]

            if (authToken) {
                saveTokens(authToken, refreshToken)
            }

            if ( options.headers ) {
                (options.headers as {[key: string]: string }).authorization = accessToken
            }

            return await request<T>(endpoint, options)
        }
    }
}

const getRefreshToken = async (): Promise<TGetRefreshToken> => {
    return await request('/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

const checkResponse = <T>(result: Response): Promise<T> => {
    if (result.ok) {
        return result.json()
    }

    return Promise.reject(result.status)
}

const checkSuccess = <T>(result: any): T => {
    if (result && result.success) {
        return result
    }

    // eslint-disable-next-line no-throw-literal
    throw 'Ответ не success'
}

const request = async <T>(endpoint: RequestInfo, options?: RequestInit): Promise<T> => {
    const data = await fetch(`${BASE_URL}${endpoint}`, options)
    const response = await checkResponse<T>(data)

    return checkSuccess<T>(response)
}

export {
    loadIngredients,
    resetPassword,
    forgotPassword,
    registerUser,
    submitOrder,
    updateUser,
    logoutUser,
    loginUser,
    getUser,
}