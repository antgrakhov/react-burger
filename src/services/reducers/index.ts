import {combineReducers} from 'redux'
import {constructorReducer} from './constructor'
import {ingredientsReducer} from './ingredients'
import {resetPasswordReducer} from './reset-password'
import {feedOrdersReducer} from './feed-orders'
import {orderReducer} from './order'
import {userReducer} from './user'

export const rootReducer = combineReducers({
    ingredientsConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    resetPassword: resetPasswordReducer,
    feedOrders: feedOrdersReducer,
    order: orderReducer,
    user: userReducer,
})