import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients'

const initialState = {
    items: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
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
                ingredientsRequest: false
            }
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                items: [],
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }

        default:
            return state;
    }
}