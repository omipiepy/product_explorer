import React from 'react'

export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const product = action.product;
            const existingProduct = state.find((item) => item.id === product.id);

            if (existingProduct) {
                return state.map((item)=> item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity +1, item.stock)} : item )
            }
            return [
                ...state,
                {
                    id:product.id,
                    title: product.title,
                    price: product.price,
                    quantity:1,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                },
            ];
        }

        case "REMOVE": 
            return state.filter((item) => item.id !== action.id );

        case "SET_QUANTITY": {
            if (action.quantity <1) return state;

            return state.map((item) => item.id === action.id
            ? { ...item, quantity: Math.min(action.quantity, item.stock)} : item
            );
        } 
    
        case "CLEAR":
            return [];

        default:
            return state;
    }
}
