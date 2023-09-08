import {getCookie, saveTokens} from './cookies'

const BASE_URL = 'https://norma.nomoreparties.space/api'

const loadIngredients = () => {
    return request('/ingredients')
}

const submitOrder = (data) => {
    return request('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

const registerUser = (form) => {
    return request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const loginUser = (form) => {
    return request('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    })
}

const getUser = () => {
    return requestWithRefresh('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
    })
}

const updateUser = (form) => {
    return requestWithRefresh('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    })
}

const logoutUser = () => {
    return request('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

const forgotPassword = (email) => {
    return request('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    })
}

const resetPassword = (password, token) => {
    return request('/password-reset/reset', {
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

const requestWithRefresh = async (endpoint, options) => {
    try {
        return await request(endpoint, options)
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

            options.headers['Authorization'] = accessToken

            return await request(endpoint, options)
        }
    }
}

const getRefreshToken = async () => {
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

const checkResponse = (result) => {
    if (result.ok) {
        return result.json()
    }

    return Promise.reject(result.status)
}

const checkSuccess = (result) => {
    if (result && result.success) {
        return result
    }

    // eslint-disable-next-line no-throw-literal
    throw 'Ответ не success'
}

const request = async (endpoint, options) => {
    return await fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
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