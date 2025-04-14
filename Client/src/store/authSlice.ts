
import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null,
        isAuthenticated: false,
    },
    reducers:{
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        loginUser: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.userData = null;
            state.isAuthenticated = false;
        },
    }
})

export const {setUserData, loginUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;
