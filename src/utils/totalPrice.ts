import {TIngredient, TIngredientUnique} from '../types'

type TIngredientGeneral = TIngredient | TIngredientUnique

export default function getTotalPrice(ingredients: TIngredientGeneral[]): number {
    return ingredients.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price
    }, 0)
}