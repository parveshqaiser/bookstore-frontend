import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState : {
        cartItems : [],
    },
    reducers : {
        addToCart : (state, action)=>{
            let itemExist = state.cartItems.find(book => book._id == action.payload._id);
            if(itemExist){
                action.payload.alreadyExist = true;
            }else{
                state.cartItems.push(action.payload);
            }           
        },
        removeFromCart : (state,action)=>{
            state.cartItems = state.cartItems.filter(item => item?._id !== action.payload);
        },
        clearCart : (state)=>{
            state.cartItems =[]
        },
        increaseQuantity : (state, action)=>{
            const book = state.cartItems.find((b) => b._id === action.payload);
            // console.log(book.perUnit, "****************")
            if (book) {
                book.qty += 1;
                book.newPrice = book.perUnit * book.qty;
            }
        },
        decreaseQuantity : (state, action)=>{
            const book = state.cartItems.find((b) => b._id === action.payload);
            if (book && book.qty > 1) {
                book.qty -= 1;
                book.newPrice = book.perUnit * book.qty;
            }
        }
    },
});

export const {addToCart, removeFromCart, clearCart , increaseQuantity , decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;