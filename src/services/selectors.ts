import {RootState} from '../types/store'

const ingredientsConstructorSelector = (store: any) => store.ingredientsConstructor
const resetPasswordSelector = (store: any) => store.resetPassword
const ingredientsSelector = (store: any) => store.ingredients
const feedOrdersSelector = (store: RootState) => store.feedOrders
const orderSelector = (store: any) => store.order
const userSelector = (store: any) => store.user

export {
    ingredientsConstructorSelector,
    resetPasswordSelector,
    ingredientsSelector,
    feedOrdersSelector,
    orderSelector,
    userSelector
}