import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const foodItemsfromDb = createAsyncThunk(
  "foodItemsfromDb",
  async (userDetails, thunkAPI) => {
    //make post
    let data;
    console.log("food Slice");
    let response = await axios.post("/users/getfooditems");
    if (response.data.message === "success") {
      console.log("response", response);
      return response.data.payload;
    }
  }
);

let foodSlice = createSlice({
  name: "foodItems",
  initialState: { foodItems: [] },
  reducers: {
    //setRestaurantsOfStore : (state,action) =>{state.foodItems = action.payload}
  },
  extraReducers: {
    [foodItemsfromDb.fulfilled]: (state, action) => {
      state.foodItems = action.payload;
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
export default foodSlice.reducer;
