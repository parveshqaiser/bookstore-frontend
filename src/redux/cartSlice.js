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
        removeFromCart : (state,id)=>{
            state.cartItems = state.cartItems.filter(item => item?._id !==id);
        },
        clearCart : (state)=>{
            state.cartItems =[]
        },
    },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;