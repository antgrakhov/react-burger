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
            const newCounts = {...state.selectedCounts}
            const prevBunItem = state.selectedItems.find(item => item.type === 'bun')

            if ( prevBunItem ) {
                newCounts[prevBunItem._id].count = 0
            }

            const newItems = state.selectedItems.filter(item => item.type !== 'bun')
            const newItem = {...action.payload.item}

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
            const newItem = {...action.payload.item}
            const itemId = action.payload._id
            const newCounts = {...state.selectedCounts}

            newItems.splice(-1, 0, newItem)

            if ( newCounts[itemId] ) {
                newCounts[itemId].count += 1
            } else {
                newCounts[itemId] = {
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
            const {
                id,
                uniqueId
            } = action.payload
            const newCounts = {...state.selectedCounts}

            if ( newCounts[id] ) {
                newCounts[id].count = newCounts[id].count > 0
                    ? --newCounts[id].count
                    : 0
            }

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
            } = action.payload

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