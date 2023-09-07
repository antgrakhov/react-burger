import {combineReducers} from 'redux'
import {ingredientsReducer} from './ingredients'
import {constructorReducer} from './constructor'
import {ingredientDetailsReducer} from './ingredient-details'
import {orderReducer} from './order'
import {userReducer} from './user'
import {resetPasswordReducer} from './reset-password'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    user: userReducer,
    resetPassword: resetPasswordReducer,
})