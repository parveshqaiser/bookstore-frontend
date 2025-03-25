
import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name : "book",
    initialState : {
        allBooks : [],
    },
    reducers : {
        addAllBooks : (state, action)=>{
            state.allBooks = action.payload
        }
    }
});

export let {addAllBooks} = bookSlice.actions;
export default bookSlice.reducer;