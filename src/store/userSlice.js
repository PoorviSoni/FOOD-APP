import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const userLogin = createAsyncThunk('loginUser' , async(userDetails,thunkAPI)=>{

    //make post
    let data;

    

    if(userDetails.type==='User'){
        let response = await axios.post('/users/login',userDetails)
    data = response.data
    console.log(data)

    }
    if(userDetails.type==='Admin'){
        let response = await axios.post('/admin/login',userDetails)
   data = response.data
    console.log(data)

    }
    console.log( "new",data)

    if(data.message === "success"){
        // save in local storage
        localStorage.setItem("token", data.token)
        return data.user;
    }
    if(data.message === "invalid user" || data.message === "invalid password"){
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data)
    }
})
const userSlice = createSlice({
    name:"user",
    initialState:{
        userObj:{},
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLogin :""
    },
    reducers:{
        clearLoginStatus:(state) =>{
            state.isSuccess = false;
            state.userObj={}
            return state;
        }
    },
    extraReducers:{
        [userLogin.fulfilled]:(state , action)=>{
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
        },
        [userLogin.pending]:(state , action)=>{
            state.isLoading = true;
        },
        [userLogin.rejected]:(state , action)=>{
            state.isError = true;
            state.isLoading = false;
            state.invalidLogin = action.payload.message;
        }
    }
})

export const {clearLoginStatus} = userSlice.actions 
export default userSlice.reducer