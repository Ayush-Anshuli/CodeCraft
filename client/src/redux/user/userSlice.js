import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,  //user should be null at the beginning
    error:null,
    loading: false
}

const userSlice = createSlice ({
    name:'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true,
            state.error = null
        },
        // IF SIGNIN IS SUCCESSFULL THEN WE WILL USE LOGIC
        signInSuccess: (state,action) => {
            state.currentUser = action.payload; // payload the user IF THE SIGNIN IS SUCCESS
            state.loading = false,
            state.error = null;
        },
        // IF SIGNIN IS UNSUCCESSFULL THE WE WILL USE THIS LOGIC
        signInFailure : (state,action) => {
            state.loading = false,
            state.error = action.payload
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          deleteUserStart:(state) => {
            state.loading = true,
            state.error = false
          },
          deleteUserFailure:(state,action) => {
            state.loading = false,
            state.error = action.payload
          },
          deleteUserSuccess : (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null
          },
          signoutsuccess : (state) => {
            state.currentUser = null,
            state.error = null,
            state.loading = false
          }
    }
})

export const {signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,
    deleteUserStart,deleteUserFailure,deleteUserSuccess,signoutsuccess
} = userSlice.actions;
export default userSlice.reducer