import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "redux/slices/token-slice"
import spotifyReducer from "redux/slices/spotify-slice"

const store = configureStore({
    reducer: {
        token: tokenReducer,
        spotify: spotifyReducer
    }
})

export default store