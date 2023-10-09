import {loadIngredients} from '../../utils/api'
import {TAppDispatch} from '../../types/store'
import {TIngredient} from '../../types'

const GET_INGREDIENTS_REQUEST: 'INGREDIENTS/REQUEST_GET' = 'INGREDIENTS/REQUEST_GET'
const GET_INGREDIENTS_SUCCESS: 'INGREDIENTS/SUCCESS_GET' = 'INGREDIENTS/SUCCESS_GET'
const GET_INGREDIENTS_FAILED: 'INGREDIENTS/FAILED_GET' = 'INGREDIENTS/FAILED_GET'

type TIngredientsRequest = {
    type: typeof GET_INGREDIENTS_REQUEST
}

type TIngredientsSuccess = {
    type: typeof GET_INGREDIENTS_SUCCESS
    payload: TIngredient[]
}

type TIngredientsFailed = {
    type: typeof GET_INGREDIENTS_FAILED
}

type TIngredientsActions = TIngredientsRequest
    | TIngredientsSuccess
    | TIngredientsFailed

const getIngredients = (): (dispatch: TAppDispatch) => Promise<void> => {
    return async function (dispatch: TAppDispatch) {
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
    getIngredients,
    type TIngredientsRequest,
    type TIngredientsSuccess,
    type TIngredientsFailed,
    type TIngredientsActions,
}