import {loadIngredients} from '../../utils/burger-api'

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
                let action = {
                    type: GET_INGREDIENTS_FAILED
                }

                if ( result.success === true ) {
                    action = {
                        type: GET_INGREDIENTS_SUCCESS,
                        payload: result.data
                    }
                }

                dispatch(action)
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