import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalAmount } from "../../helpers/cart";

const cartLS = JSON.parse(localStorage.getItem('cart')) === null ? [] : JSON.parse(localStorage.getItem('cart'));

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cart: cartLS,
        totalAmount: calculateTotalAmount(cartLS).toFixed(2),
    },
    reducers:{
        modifyCart(state, action){
            state.cart = action.payload.cart;
            state.totalAmount = action.payload.totalAmount;
        },
        cleanCart(state){
            state.cart = [];
            state.totalAmount = 0;
        },
    }
});

export const {modifyCart, cleanCart} = cartSlice.actions;

export default cartSlice.reducer;