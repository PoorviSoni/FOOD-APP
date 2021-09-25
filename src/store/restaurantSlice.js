import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const restaurant = createAsyncThunk(
  "restaurant",
  async (userDetails, thunkAPI) => {
    //make post
    let data;
    console.log("restauarant Slice");
    let response = await axios.post("/users/getrestaurants");
    if (response.data.message === "success") {
      console.log("response", response);
      return response.data.payload;
    }
  }
);

let restaurantDetSlice = createSlice({
  name: "restaurants",
  initialState: { restaurants: [] },
  reducers: {
    //setRestaurantsOfStore : (state,action) =>{state.restaurants = action.payload}
  },
  extraReducers: {
    [restaurant.fulfilled]: (state, action) => {
      state.restaurants = action.payload;
      // state.isSuccess = true;
      // state.isLoading = false;
      // state.isError = false;
    },
    // [userLogin.pending]: (state, action) => {
    //     state.isLoading = true;
    // },
    // [userLogin.rejected]: (state, action) => {
    //     state.isError = true;
    //     state.isLoading = false;
    //     state.invalidLogin = action.payload.message;
    // }
  },
});
//export let {setRestaurantsOfStore} = restaurantDetSlice.actions
export default restaurantDetSlice.reducer;
