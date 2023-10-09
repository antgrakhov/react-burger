import {v4 as uuid} from 'uuid'
import {
    TIngredient,
    TIngredientBun,
    TIngredientUnique
} from '../../types'

const ADD_CONSTRUCTOR_BUN_ITEM = 'CONSTRUCTOR/ADD_BUN_ITEM'
const ADD_CONSTRUCTOR_INSIDE_ITEM = 'CONSTRUCTOR/ADD_INSIDE_ITEM'
const REMOVE_CONSTRUCTOR_INSIDE_ITEM = 'CONSTRUCTOR/REMOVE_INSIDE_ITEM'
const MOVE_CONSTRUCTOR_INSIDE_ITEM = 'CONSTRUCTOR/MOVE_INSIDE_ITEM'
const CLEAR_CONSTRUCTOR = 'CONSTRUCTOR/CLEAR'

type TAddToConstructorBunItem = {
    type: typeof ADD_CONSTRUCTOR_BUN_ITEM
    payload: TIngredientBun
}

type TAddToConstructorInsideItem = {
    type: typeof ADD_CONSTRUCTOR_INSIDE_ITEM
    payload: TIngredientUnique
}

type TMoveCoords = {
    indexFrom: number
    indexTo: number
}

type TMoveConstructorInsideItem = {
    type: typeof MOVE_CONSTRUCTOR_INSIDE_ITEM
    coords: TMoveCoords
}

type TRemoveConstructorInsideItem = {
    type: typeof REMOVE_CONSTRUCTOR_INSIDE_ITEM
    id: string
    uniqueId: string
}

type TClearConstructor = {
    type: typeof CLEAR_CONSTRUCTOR
}

type TConstructorActions = TAddToConstructorBunItem
    | TAddToConstructorInsideItem
    | TMoveConstructorInsideItem
    | TRemoveConstructorInsideItem
    | TClearConstructor

function addToConstructorBunItem(item: TIngredient): TAddToConstructorBunItem {
    return {
        type: ADD_CONSTRUCTOR_BUN_ITEM,
        payload: {
            ...item,
            topUniqueId: uuid(),
            bottomUniqueId: uuid(),
        }
    }
}

function addToConstructorInsideItem(item: TIngredient): TAddToConstructorInsideItem {
    return {
        type: ADD_CONSTRUCTOR_INSIDE_ITEM,
        payload: {
            ...item,
            uniqueId: uuid()
        },
    }
}

function moveConstructorInsideItem(indexFrom: number, indexTo: number): TMoveConstructorInsideItem {
    return {
        type: MOVE_CONSTRUCTOR_INSIDE_ITEM,
        coords: {
            indexFrom,
            indexTo,
        }
    }
}

function removeConstructorInsideItem(id: string, uniqueId: string): TRemoveConstructorInsideItem {
    return {
        type: REMOVE_CONSTRUCTOR_INSIDE_ITEM,
        id,
        uniqueId
    }
}

export {
    ADD_CONSTRUCTOR_BUN_ITEM,
    ADD_CONSTRUCTOR_INSIDE_ITEM,
    REMOVE_CONSTRUCTOR_INSIDE_ITEM,
    MOVE_CONSTRUCTOR_INSIDE_ITEM,
    CLEAR_CONSTRUCTOR,
    addToConstructorBunItem,
    addToConstructorInsideItem,
    moveConstructorInsideItem,
    removeConstructorInsideItem,
    type TAddToConstructorBunItem,
    type TAddToConstructorInsideItem,
    type TMoveCoords,
    type TMoveConstructorInsideItem,
    type TRemoveConstructorInsideItem,
    type TConstructorActions,
}