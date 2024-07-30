import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import Userreducer from "./slices/Userslice"; // assuming your user slice is exported from 'Userslice.js'
import Cartreducer from "./slices/CartSlice"; // assuming your cart slice is exported from 'cartSlice.js'

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  user: Userreducer,
  cart: Cartreducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persisted store
export const persistor = persistStore(store);