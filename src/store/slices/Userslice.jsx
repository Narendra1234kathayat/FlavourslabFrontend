// import { createSlice } from '@reduxjs/toolkit';
// import Axios from 'axios'; // Import Axios library
// import Cookies from "js-cookie";

// const Status = Object.freeze({
//   IDLE: 'idle',
//   ERROR: 'error',
//   LOADING: 'loading'
// });

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     data: [],
//     status: Status.IDLE
//   },
//   reducers: {
//     setUser(state, action) {
//       state.data = action.payload;
//     },
//     setStatus(state, action) {
//       state.status = action.payload;
//     }
//   },
// });

// export const { setUser, setStatus } = userSlice.actions;

// export default userSlice.reducer;

// export function FetchUser() {
//   return async function FetchUserThunk(dispatch, getState) {
//     Axios.defaults.withCredentials = true;

//     dispatch(setStatus(Status.LOADING));
//     try {

//       const response = await Axios.post(
//         "https://flavourslabbackend.onrender.com/api/auth/getuser",
//         {}, // Payload can be an empty object if there is no data to send in the body
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: Cookies.get("token")
//           }
//         }
//       );
//      // console.log(response);
//       const data = response.data; // Axios already parses JSON
//       //console.log(data, "response data");

//       dispatch(setUser(data));
//       dispatch(setStatus(Status.IDLE));
//     } catch (error) {
//       console.error(error);
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUser = createAsyncThunk("FetchUser", async () => {
  try {
    const requestOptions = {
      method: "POST",
      url: "https://flavourslabbackend.onrender.com/api/auth/getuser",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("authToken"),
      },
    };

    console.log(requestOptions.headers);
    
    const response = await axios(requestOptions);
    return response.data
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isError:false,
    isLoading:false
  },
  reducers: {
    removeUser(state,action){
      state.data = [];
      state.isError = false;
      state.isLoading = false;
    }
  },
  extraReducers: (builder)=>{

    builder.addCase(FetchUser.pending,(state,action)=>{
      state.data = [];
      state.isLoading = true;
      state.isError = false;
    })

    builder.addCase(FetchUser.fulfilled, (state,action)=>{

      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.user
      //console.log(action.payload.user);
      
    })

    builder.addCase(FetchUser.rejected,(state,action)=>{
      state.isError = true;
      state.isLoading = false;
      state.data = []
    })

    
  }
});

export default userSlice.reducer;
export const {removeUser} = userSlice.actions; 
