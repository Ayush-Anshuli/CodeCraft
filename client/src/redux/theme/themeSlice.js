import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'dark'
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers : {
        ToggleTheme : (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
        }
    }
})

export const {ToggleTheme} = themeSlice.actions
export default themeSlice.reducer