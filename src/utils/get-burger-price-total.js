export const getBurgerPriceTotal = (items) => {
    let totalPrice = 0
    const bunItem = items.find(el => el.type === 'bun')

    if ( bunItem ) {
        totalPrice = items.reduce((total, ingredient) => {
            return total + ingredient.price
        }, 0)
    }

    return totalPrice
}