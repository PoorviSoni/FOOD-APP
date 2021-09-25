import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosRequestWithToken from "../AuthorizedTokens/AxiosRequestWithToken";

export const cartItemsfromDb = createAsyncThunk(
  "cartItemsfromDb",
  async (userDetails, thunkAPI) => {
    console.log("cart Slice");
    let axiosToken = await AxiosRequestWithToken();
    //make post
    let data;

    let response = await axiosToken.post("/users/getcartitems", userDetails);
    if (response.data.message === "success") {
      console.log("response", response);
      return response.data.payload;
    }
  }
);

let cartSlice = createSlice({
  name: "cartItems",
  initialState: { cartItems: [] },
  reducers: {
    setCartOfStore: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: {
    [cartItemsfromDb.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
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
export let { setCartOfStore } = cartSlice.actions;
export default cartSlice.reducer;
