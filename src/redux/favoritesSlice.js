import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        // Will toggle an amiibo favorited or not
        toggleFavorite(state, action) {
            const amiiboToAdd = state.find(amiibo => amiibo.id === action.payload.id);

            // If the amiibo is not already in the list
            if(!amiiboToAdd){
                state.push({
                    name: action.payload.name,
                    personality: action.payload.personality,
                    gender: action.payload.gender,
                    url: action.payload.url,
                    image_url: action.payload.image_url,
                    id: action.payload.id
                })
            }
            // Otherwise return the state but without the amiibo in it. O(n) time I believe
            else{
                return state.filter((amiibo) => amiibo.id !== action.payload.id)
            }
        }
    },
    selectors: {
        // Selector 
        selectIfIsOwned(state, id){
            const amiiboIsOwned = state.find(amiibo => amiibo.id === id);
            if(amiiboIsOwned){
                return true;
            }
            else {
                return false;
            }

        }
    }
})

export default favoritesSlice.reducer
export const { toggleFavorite } = favoritesSlice.actions
export const selectFavorites = favoritesSlice.selectSlice
export const { selectIfIsOwned } = favoritesSlice.selectors