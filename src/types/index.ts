enum OrderStatusTypes {
    Created = 'created',
    Pending = 'pending',
    Done = 'done',
}

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

type TOrderData = {
    ingredients: string[]
    _id: string
    name: string
    status: OrderStatusTypes
    number: number
    createdAt: string
    updatedAt: string
    owner?: string
    _v?: number
}

type TOrderIngredient = {
    ingredient: TIngredient
    quantity: number
}

type TFeedOrders = {
    orders: TOrderData[]
    total: number
    totalToday: number
}

export {
    OrderStatusTypes,
    type TIngredient,
    type TUserUpdateForm,
    type TIngredientUnique,
    type TFeedOrders,
    type TOrderData,
    type TOrderIngredient,
}