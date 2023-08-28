import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS
} from '../actions/ingredient-details'

const initialState = {
    ingredientId: 0,
    isDetailsModalShow: false,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientId: action.payload.id,
                isDetailsModalShow: true
            }
        }
        case HIDE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientId: 0,
                isDetailsModalShow: false
            }
        }
        default: {
            return state
        }
    }
}