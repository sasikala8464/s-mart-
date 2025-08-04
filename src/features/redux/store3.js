import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./slices.js/uiSlice"
import productSliceReducer from "./slices.js/productSlice"
import WhishlistReducer from "./slices.js/wishlistSlice"
export const store3=configureStore({
    reducer:{
 user:uiSliceReducer,
 product:productSliceReducer,
 wishlist:WhishlistReducer


    }
})