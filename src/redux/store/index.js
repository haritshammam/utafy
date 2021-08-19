import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "redux/slices/token-slice"
import spotifyReducer from "redux/slices/spotify-slice"
import uiReducer from "redux/slices/ui-slice"

const store = configureStore({
    reducer: {
        token: tokenReducer,
        spotify: spotifyReducer,
        ui: uiReducer
    }
})

export default store