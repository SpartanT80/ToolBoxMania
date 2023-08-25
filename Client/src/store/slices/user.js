import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        infos: {
            isAdmin: false,
            email: null,
            company: null,
            first_name: null,
            last_name: null,
            address: null,
            city: null,
            postal_code: null,
            country: null,
            phone_number: null,
        },
        isLogged: false,
    },
    reducers: {
        signIn(state, action) {
            state.infos = action.payload;
            state.isLogged = true;
        },
        signOut(state, action){
            state.infos = null;
            state.isLogged = false;
        }
    }
});

export const {signIn, signOut} = userSlice.actions;
export default userSlice.reducer;