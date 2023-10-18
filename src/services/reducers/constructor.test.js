import {constructorReducer} from './constructor'
import {
    ADD_CONSTRUCTOR_BUN_ITEM,
    ADD_CONSTRUCTOR_INSIDE_ITEM,
    REMOVE_CONSTRUCTOR_INSIDE_ITEM,
    MOVE_CONSTRUCTOR_INSIDE_ITEM,
    CLEAR_CONSTRUCTOR,
} from '../actions/constructor'
import {initialState} from './constructor'

describe('burger-constructor reducer', () => {
    const testBun1 = {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
    }
    const testBun2 = {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0
    }
    const testIngredient1 = {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
    }
    const testIngredient2 = {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0
    }

    it('should return initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_CONSTRUCTOR_BUN_ITEM', () => {
        expect(constructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_BUN_ITEM,
            payload: testBun1
        })).toEqual({
            selectedItems: [testBun1, testBun1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 2,
                }
            }
        })

        expect(constructorReducer({
            selectedItems: [testBun1, testBun1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 2,
                }
            }
        }, {
            type: ADD_CONSTRUCTOR_BUN_ITEM,
            payload: testBun2
        })).toEqual({
            selectedItems: [testBun2, testBun2],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 0,
                },
                '643d69a5c3f7b9001cfa093d': {
                    type: 'bun',
                    count: 2,
                }
            }
        })
    })

    it('should handle ADD_CONSTRUCTOR_INSIDE_ITEM', () => {
        expect(constructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_INSIDE_ITEM,
            payload: testIngredient1
        })).toEqual({
            selectedItems: [testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                }
            }
        })

        expect(constructorReducer({
            selectedItems: [testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                }
            }
        }, {
            type: ADD_CONSTRUCTOR_INSIDE_ITEM,
            payload: testIngredient1
        })).toEqual({
            selectedItems: [testIngredient1, testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 2,
                }
            }
        })

        expect(constructorReducer({
            selectedItems: [testIngredient1, testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 2,
                }
            }
        }, {
            type: ADD_CONSTRUCTOR_INSIDE_ITEM,
            payload: testIngredient2
        })).toEqual({
            selectedItems: [testIngredient1, testIngredient2, testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 2,
                },
                '643d69a5c3f7b9001cfa0941': {
                    type: 'main',
                    count: 1,
                }
            }
        })
    })

    it('should handle REMOVE_CONSTRUCTOR_INSIDE_ITEM', () => {
        expect(constructorReducer({
            selectedItems: [testIngredient1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                }
            }
        }, {
            type: REMOVE_CONSTRUCTOR_INSIDE_ITEM,
            id: '643d69a5c3f7b9001cfa0942'
        })).toEqual({
            selectedItems: [],
            selectedCounts: {
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 0,
                }
            }
        })
    })

    it('should handle MOVE_CONSTRUCTOR_INSIDE_ITEM', () => {
        expect(constructorReducer({
            selectedItems: [testBun1, testIngredient1, testIngredient2, testBun1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 2,
                },
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                },
                '643d69a5c3f7b9001cfa0941': {
                    type: 'main',
                    count: 1,
                }
            }
        }, {
            type: MOVE_CONSTRUCTOR_INSIDE_ITEM,
            coords: {
                indexFrom: 1,
                indexTo: 2,
            }
        })).toEqual({
            selectedItems: [testBun1, testIngredient2, testIngredient1, testBun1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 2,
                },
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                },
                '643d69a5c3f7b9001cfa0941': {
                    type: 'main',
                    count: 1,
                }
            }
        })
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        expect(constructorReducer({
            selectedItems: [testBun1, testIngredient1, testIngredient2, testBun1],
            selectedCounts: {
                '643d69a5c3f7b9001cfa093c': {
                    type: 'bun',
                    count: 2,
                },
                '643d69a5c3f7b9001cfa0942': {
                    type: 'sauce',
                    count: 1,
                },
                '643d69a5c3f7b9001cfa0941': {
                    type: 'main',
                    count: 1,
                }
            }
        }, {
            type: CLEAR_CONSTRUCTOR,
        })).toEqual(initialState)
    })
})