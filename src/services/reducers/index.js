import {combineReducers} from 'redux'
import {ingredientsReducer} from './ingredients'
import {constructorReducer} from './constructor'
import {ingredientDetailsReducer} from './ingredient-details'
import {orderReducer} from './order'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
})