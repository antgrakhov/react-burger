import { loadIngredients } from '../../utils/burger-api'

const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

const getIngredients = () => {
    return async function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })

        loadIngredients()
            .then(result => {
                if ( result.success === true ) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        payload: result.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
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