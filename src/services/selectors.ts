import {RootState} from '../types/store'

const ingredientsConstructorSelector = (store: RootState) => store.ingredientsConstructor
const historyOrdersSelector = (store: RootState) => store.historyOrders
const resetPasswordSelector = (store: RootState) => store.resetPassword
const ingredientsSelector = (store: RootState) => store.ingredients
const feedOrdersSelector = (store: RootState) => store.feedOrders
const orderViewSelector = (store: RootState) => store.orderView
const orderSelector = (store: RootState) => store.order
const userSelector = (store: RootState) => store.user

export {
    ingredientsConstructorSelector,
    resetPasswordSelector,
    historyOrdersSelector,
    ingredientsSelector,
    feedOrdersSelector,
    orderViewSelector,
    orderSelector,
    userSelector
}