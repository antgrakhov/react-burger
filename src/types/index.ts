type TIngredient = {
    _id: string
    name: string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
}

type TIngredientUnique = TIngredient & {uniqueId: string}

type TUserUpdateForm = {
    name?: string
    email?: string
    password?: string
}

export type {
    TIngredient,
    TUserUpdateForm,
    TIngredientUnique,
}