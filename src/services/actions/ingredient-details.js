const SHOW_INGREDIENT_DETAILS = 'INGREDIENT/SHOW_DETAILS'
const HIDE_INGREDIENT_DETAILS = 'INGREDIENT/HIDE_DETAILS'

function showIngredientDetails(id) {
    return {
        type: SHOW_INGREDIENT_DETAILS,
        payload: {
            id
        }
    }
}

export {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    showIngredientDetails,
}