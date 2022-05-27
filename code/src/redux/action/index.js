//Add Item
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}
//Del from Cart
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

export const closeItem = (product) => {
    return {
        type: "CLOSEITEM",
        payload: product
    }
}