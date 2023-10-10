import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    TIngredientsActions
} from '../actions/ingredients'
import {TIngredient} from '../../types'

type TIngredientsState = {
    items: TIngredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean
}

const initialState: TIngredientsState = {
    items: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state: TIngredientsState = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                ingredientsRequest: false,
                ingredientsFailed: false,
            }
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                items: [],
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }

        default:
            return state;
    }
}