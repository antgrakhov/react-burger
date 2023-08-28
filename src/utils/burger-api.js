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

const checkResponse = (result) => {
    if (result.ok) {
        return result.json()
    }

    return Promise.reject(`Ошибка ${result.status}`)
}

const checkSuccess = (result) => {
    if (result && result.success) {
        return result
    }

    return Promise.reject(`Ответ не success: ${result}`)
}

const request = async (endpoint, options) => {
    return await fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}

export {
    loadIngredients,
    submitOrder
}