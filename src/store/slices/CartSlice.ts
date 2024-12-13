import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../store";
import {ProductListResponseType, ProductResponseType} from "@/features/Product";

export interface CartState {
    cart: ProductListResponseType,
}

const initialState: CartState = {
    cart: [],
}

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ProductListResponseType>) => {
            state.cart = action.payload
        },
        addToCart: (state, action: PayloadAction<ProductResponseType>) => {
            state.cart.push(action.payload)
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        clearCart: (state, action: PayloadAction<void>) => {
            state.cart = []
        },

    }
})

export const {setCart, addToCart, deleteFromCart, clearCart} = CartSlice.actions
export const selectCart = (state: RootState) => state.CartSlice.cart
export default CartSlice.reducer