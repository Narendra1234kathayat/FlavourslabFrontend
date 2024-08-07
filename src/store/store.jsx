import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import Userreducer from "./slices/Userslice"; // assuming your user slice is exported from 'Userslice.js'
import Cartreducer from "./slices/CartSlice"; // assuming your cart slice is exported from 'cartSlice.js'
import { persistReducer, PERSIST } from "redux-persist";
// Configuration for Redux Persist
const persistConfig = {
  key: 'persist-root',
 
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [ PERSIST ],
      },
    }),
});

// Create the persisted store
export const persistor = persistStore(store);