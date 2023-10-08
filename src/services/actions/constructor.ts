import {v4 as uuid} from 'uuid'
import {TIngredient} from '../../types'

const ADD_CONSTRUCTOR_BUN_ITEM: 'CONSTRUCTOR/ADD_BUN_ITEM' = 'CONSTRUCTOR/ADD_BUN_ITEM'
const ADD_CONSTRUCTOR_INSIDE_ITEM: 'CONSTRUCTOR/ADD_INSIDE_ITEM' = 'CONSTRUCTOR/ADD_INSIDE_ITEM'
const REMOVE_CONSTRUCTOR_INSIDE_ITEM: 'CONSTRUCTOR/REMOVE_INSIDE_ITEM' = 'CONSTRUCTOR/REMOVE_INSIDE_ITEM'
const MOVE_CONSTRUCTOR_INSIDE_ITEM: 'CONSTRUCTOR/MOVE_INSIDE_ITEM' = 'CONSTRUCTOR/MOVE_INSIDE_ITEM'
const CLEAR_CONSTRUCTOR: 'CONSTRUCTOR/CLEAR' = 'CONSTRUCTOR/CLEAR'

function addToConstructorBunItem(item: TIngredient) {
    return {
        type: ADD_CONSTRUCTOR_BUN_ITEM,
        payload: {
            item,
            topUniqueId: uuid(),
            bottomUniqueId: uuid(),
        }
    }
}

function addToConstructorInsideItem(item: TIngredient) {
    return {
        type: ADD_CONSTRUCTOR_INSIDE_ITEM,
        payload: {
            item: {
                ...item,
                uniqueId: uuid()
            }
        },
    }
}

function moveConstructorInsideItem(indexFrom: number, indexTo: number) {
    return {
        type: MOVE_CONSTRUCTOR_INSIDE_ITEM,
        payload: {
            indexFrom,
            indexTo,
        }
    }
}

function removeConstructorInsideItem(id: string, uniqueId: string) {
    return {
        type: REMOVE_CONSTRUCTOR_INSIDE_ITEM,
        payload: {
            id,
            uniqueId,
        }
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
}