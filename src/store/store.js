import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import foodSlice from "./foodSlice"
import restaurantSlice from "./restaurantSlice"
import cartSlice from "./cartSlice"
import searchSlice from "./searchSlice"
export default configureStore({
  reducer: {
    user: userSlice,
    foodItem: foodSlice,
    restaurant: restaurantSlice,
    cart: cartSlice,
    searchFood: searchSlice,
  },
});