import {v4 as uuid} from 'uuid'
import {
    ADD_CONSTRUCTOR_BUN_ITEM,
    ADD_CONSTRUCTOR_INSIDE_ITEM,
    REMOVE_CONSTRUCTOR_INSIDE_ITEM,
    MOVE_CONSTRUCTOR_INSIDE_ITEM,
} from '../actions/constructor'

const initialState = {
    selectedItems: [],
    selectedCounts: {}
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_BUN_ITEM: {
            const newItems = state.selectedItems.filter(item => item.type !== 'bun')
            const prevBunItem = state.selectedItems.find(item => item.type === 'bun')
            const newCounts = {...state.selectedCounts}

            if ( prevBunItem ) {
                newCounts[prevBunItem._id].count = 0
            }

            newCounts[action.payload._id] = {
                type: action.payload.type,
                count: 2,
            }

            newItems.unshift({
                ...action.payload,
                uniqueId: uuid()
            })
            newItems.push({
                ...action.payload,
                uniqueId: uuid()
            })

            return {
                ...state,
                selectedItems: newItems,
                selectedCounts: newCounts,
            }
        }
        case ADD_CONSTRUCTOR_INSIDE_ITEM: {
            const newItems = [...state.selectedItems]
            const newItem = {
                ...action.payload,
                uniqueId: uuid()
            }
            const newCounts = {...state.selectedCounts}

            newItems.splice(-1, 0, newItem)

            if ( newCounts[action.payload._id] ) {
                newCounts[action.payload._id].count = ++newCounts[action.payload._id].count
            } else {
                newCounts[action.payload._id] = {
                    type: action.payload.type,
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
            const newItems = [...state.selectedItems]
            const newCounts = {...state.selectedCounts}

            if ( newCounts[action.id] ) {
                newCounts[action.id].count = newCounts[action.id].count > 0
                    ? --newCounts[action.id].count
                    : 0
            }

            return {
                ...state,
                selectedItems: newItems.filter(item => item.uniqueId !== action.uniqueId),
                selectedCounts: newCounts
            }
        }
        case MOVE_CONSTRUCTOR_INSIDE_ITEM: {
            const newItems = [...state.selectedItems]
            const indexFrom = action.payload.indexFrom
            const indexTo = action.payload.indexTo

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
        default: {
            return state
        }
    }
}