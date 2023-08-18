const NORMA_API = 'https://norma.nomoreparties.space/api'

const getIngredients = async () => {
    const result = await fetch(`${NORMA_API}/ingredients`)
    return checkResponse(result)
}

const sendSubmitOrder = async (data) => {
    const result = await fetch(
        `${NORMA_API}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
    return checkResponse(result)
}

const checkResponse = (result) => {
    return result.ok
        ? result.json()
        : result.json().then((err) => Promise.reject(err))
}

export {
    getIngredients,
    sendSubmitOrder
}