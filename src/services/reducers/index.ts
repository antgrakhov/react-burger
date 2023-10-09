import {combineReducers} from 'redux'
import {resetPasswordReducer} from './reset-password'
import {historyOrdersReducer} from './history-orders'
import {constructorReducer} from './constructor'
import {ingredientsReducer} from './ingredients'
import {feedOrdersReducer} from './feed-orders'
import {orderReducer} from './order'
import {userReducer} from './user'

export const rootReducer = combineReducers({
    ingredientsConstructor: constructorReducer,
    resetPassword: resetPasswordReducer,
    historyOrders: historyOrdersReducer,
    ingredients: ingredientsReducer,
    feedOrders: feedOrdersReducer,
    order: orderReducer,
    user: userReducer,
})