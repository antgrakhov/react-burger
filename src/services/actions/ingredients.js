import {loadIngredients} from '../../utils/api'

const GET_INGREDIENTS_REQUEST: 'INGREDIENTS/REQUEST_GET' = 'INGREDIENTS/REQUEST_GET'
const GET_INGREDIENTS_SUCCESS: 'INGREDIENTS/SUCCESS_GET' = 'INGREDIENTS/SUCCESS_GET'
const GET_INGREDIENTS_FAILED: 'INGREDIENTS/FAILED_GET' = 'INGREDIENTS/FAILED_GET'

const getIngredients = () => {
    return async function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })

        loadIngredients()
            .then(result => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: result.data
                })
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}

export {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    getIngredients
}