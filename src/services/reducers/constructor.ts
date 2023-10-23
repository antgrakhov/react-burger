import {TIngredientUnique} from '../../types'
import {
    ADD_CONSTRUCTOR_BUN_ITEM,
    ADD_CONSTRUCTOR_INSIDE_ITEM,
    REMOVE_CONSTRUCTOR_INSIDE_ITEM,
    MOVE_CONSTRUCTOR_INSIDE_ITEM,
    CLEAR_CONSTRUCTOR,
    TConstructorActions,
} from '../actions/constructor'

type TSelectedCount = {
    type: string
    count: number
}

type TSelectedCounts = {
    [key: string]: TSelectedCount
}

type TConstructorState = {
    selectedItems: TIngredientUnique[]
    selectedCounts: TSelectedCounts
}

const initialState: TConstructorState = {
    selectedItems: [],
    selectedCounts: {}
}

const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_BUN_ITEM: {
            const newCounts = {...state.selectedCounts}
            const prevBunItem = state.selectedItems.find(item => item.type === 'bun')

            if ( prevBunItem ) {
                newCounts[prevBunItem._id].count = 0
            }

            const newItems = state.selectedItems.filter(item => item.type !== 'bun')
            const newItem = action.payload

            newCounts[newItem._id] = {
                type: newItem.type,
                count: 2,
            }

            const {
                topUniqueId,
                bottomUniqueId
            } = action.payload

            newItems.unshift({
                ...newItem,
                uniqueId: topUniqueId
            })
            newItems.push({
                ...newItem,
                uniqueId: bottomUniqueId
            })

            return {
                ...state,
                selectedItems: newItems,
                selectedCounts: newCounts,
            }
        }
        case ADD_CONSTRUCTOR_INSIDE_ITEM: {
            const newItems = [...state.selectedItems]
            const newItem = {...action.payload}
            const {
                _id,
                type
            } = action.payload
            const newCounts = {...state.selectedCounts}

            newItems.splice(-1, 0, newItem)

            if ( newCounts[_id] ) {
                newCounts[_id].count += 1
            } else {
                newCounts[_id] = {
                    type,
                    count: 1
                }
            }

            return {
                ...state,
                selectedItems: newItems,
                selectedCounts: newCounts
            }
        }
        case REMOVE_CONSTRUCTOR_INSIDE_ITEM: {
            const {
                id,
                uniqueId
            } = action
            const newCounts = {...state.selectedCounts}

            // if ( newCounts[id] ) {
                newCounts[id].count = newCounts[id].count > 0
                    ? --newCounts[id].count
                    : 0
            // }

            return {
                ...state,
                selectedItems: [...state.selectedItems].filter(item =>
                    item.uniqueId !== uniqueId
                ),
                selectedCounts: newCounts
            }
        }
        case MOVE_CONSTRUCTOR_INSIDE_ITEM: {
            const newItems = [...state.selectedItems]
            const {
                indexFrom,
                indexTo
            } = action.coords

            newItems.splice(indexFrom, 1)
            newItems.splice(
                indexTo,
                0,
                [...state.selectedItems][indexFrom]
            )

            return {
                ...state,
                selectedItems: newItems,
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...initialState,
            }
        }
        default: {
            return state
        }
    }
}

export {
    initialState,
    constructorReducer
}