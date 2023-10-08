import {getCookie, saveTokens} from './cookies'
import {TIngredient, TUserUpdateForm} from '../types'
import {
    HTTP_API_URL,
    PATH_API_AUTH_LOGIN,
    PATH_API_AUTH_LOGOUT,
    PATH_API_AUTH_REGISTER,
    PATH_API_AUTH_TOKEN,
    PATH_API_AUTH_USER,
    PATH_API_INGREDIENTS,
    PATH_API_ORDERS,
    PATH_API_PASSWORD_FORGOT,
    PATH_API_PASSWORD_RESET
} from './constants'

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
    return request<TIngredientsResponse>(PATH_API_INGREDIENTS)
}

const submitOrder = (data: string[]): Promise<TOrderResponse> => {
    return request<TOrderResponse>(PATH_API_ORDERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

const registerUser = (form: TRegisterUser): Promise<TGetUserWithCredsResponse> => {
    return request<TGetUserWithCredsResponse>(PATH_API_AUTH_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const loginUser = (form: TLoginUser): Promise<TGetUserWithCredsResponse> => {
    return request<TGetUserWithCredsResponse>(PATH_API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const getUser = () => {
    return requestWithRefresh<TGetUserResponse>(PATH_API_AUTH_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
    })
}

const updateUser = (form: TUserUpdateForm): Promise<TGetUserResponse> => {
    return request<TGetUserResponse>(PATH_API_AUTH_USER, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    })
}

const logoutUser = (): Promise<TMessageResponse> => {
    return request<TMessageResponse>(PATH_API_AUTH_LOGOUT, {
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
    return request<TMessageResponse>(PATH_API_PASSWORD_FORGOT, {
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
    return request<TMessageResponse>(PATH_API_PASSWORD_RESET, {
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
            const accessToken = await updateTokens()

            if ( options.headers ) {
                (options.headers as {[key: string]: string }).authorization = accessToken
            }

            return await request<T>(endpoint, options)
        }
    }
}

const updateTokens = async () => {
    let authToken

    const {
        accessToken,
        refreshToken
    } = await getRefreshToken()

    authToken = accessToken.split('Bearer ')[1]

    if (authToken) {
        saveTokens(authToken, refreshToken)
    }

    return accessToken
}

const getRefreshToken = async (): Promise<TGetRefreshToken> => {
    return await request(PATH_API_AUTH_TOKEN, {
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
    const data = await fetch(`${HTTP_API_URL}${endpoint}`, options)
    const response = await checkResponse<T>(data)

    return checkSuccess<T>(response)
}

export {
    loadIngredients,
    resetPassword,
    forgotPassword,
    registerUser,
    updateTokens,
    submitOrder,
    updateUser,
    logoutUser,
    loginUser,
    getUser,
}