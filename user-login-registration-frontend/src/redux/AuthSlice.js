import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authslice",
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.token = null;
        }
    }
});

export const { setToken, logOut } = authSlice.actions;
export default authSlice.reducer;  