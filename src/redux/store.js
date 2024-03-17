import { configureStore } from '@reduxjs/toolkit'

import favoritesReducer from './favoritesSlice'


const store = configureStore({
    reducer: {
        favorites: favoritesReducer
    }
})

store.subscribe(() => {
    console.log("== favorites list:", store.getState().favorites)
})


export default store