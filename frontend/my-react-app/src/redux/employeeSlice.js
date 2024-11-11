import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"employee",
    initialState:{
        employees:[]
    },
    reducers:{
        // actions
        setEmployee:(state, action) => {
            state.employees = action.payload;
        }
    }
});
export const { setEmployee} = authSlice.actions;
export default authSlice.reducer;