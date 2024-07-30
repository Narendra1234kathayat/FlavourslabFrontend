import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart', // Name should be a string
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const { _id, quantity } = action.payload;
            const existingProduct = state.find((product) => product._id === _id);
            if (existingProduct) {
                existingProduct.quantity += quantity || 1;

            } else {
                state.push({ ...action.payload, quantity: quantity || 1 });
            }
        },

        incitem: (state, action) => {
            const existingProduct = state.find((item) => item._id === action.payload._id)
            if (existingProduct) {
                existingProduct.quantity += 1;

            }
        },
        decitem: (state, action) => {
            const existingProductIndex = state.findIndex((item) => item._id === action.payload._id);
            if (existingProductIndex !== -1) {
                state[existingProductIndex].quantity -= 1;
                if (state[existingProductIndex].quantity === 0) {
                    state.splice(existingProductIndex, 1);
                }
            }
        },
        clearcart: (state, action) => {
            state.splice(0, state.length);
        },
    },
});

export const { setCart, incitem, decitem, clearcart } = CartSlice.actions;

export default CartSlice.reducer;