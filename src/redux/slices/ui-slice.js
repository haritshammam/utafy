import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    isMenuClicked: false
}

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: initialUIState,
    reducers: {
        setIsMenuClicked(state) {
            state.isMenuClicked = !state.isMenuClicked
        },
        setCloseMenu(state) {
            state.isMenuClicked = false
        },
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer