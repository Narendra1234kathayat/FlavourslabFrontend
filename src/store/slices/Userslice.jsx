import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios'; // Import Axios library
import Cookies from "js-cookie";

const Status = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    status: Status.IDLE
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  },
});

export const { setUser, setStatus } = userSlice.actions;

export default userSlice.reducer;

export function FetchUser() {
  return async function FetchUserThunk(dispatch, getState) {
    Axios.defaults.withCredentials = true;

    dispatch(setStatus(Status.LOADING));
    try {
      const response = await Axios.post(
        "https://flavourslabbackend.onrender.com/api/auth/getuser",
        {}, // Payload can be an empty object if there is no data to send in the body
        {
          withCredentials: true,
          headers: {
            Authorization: Cookies.get("token")
          }
        }
      );
      console.log(response);
      const data = response.data; // Axios already parses JSON
      console.log(data, "response data");

      dispatch(setUser(data));
      dispatch(setStatus(Status.IDLE));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
