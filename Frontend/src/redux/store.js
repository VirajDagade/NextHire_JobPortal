import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice.js";
import jobSlice from "../redux/jobSlice.js";
import companySlice from "../redux/companySlice.js";
import applicationSlice from "../redux/applicationSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Using combineReducers, the authSlice and jobSlice are merged into a single "root reducer." This makes the app's data structure more organized.

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

//  redux-persist: Helps save the app's data in the browser's local storage.

// Even if the user reloads the page, their data (like login state or job info) remains intact.

// The persistReducer wraps the root reducer to enable this feature.

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
    configureStore is a function from Redux Toolkit that creates a store for your application

    A store is where your app's state (data) is kept, and configureStore makes setting it up easier by adding useful features automatically.
    The store keeps your app's data in one place.

    Reducer: You provide functions (reducers) to tell the store how to update the data when actions happen.


*/
const store = configureStore({
  reducer: persistedReducer,
  // Adds middleware to handle some internal tasks safely (e.g., ensuring actions don't cause errors).
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Middleware is like a helper that works between actions and reducers.

      // Here, it ensures certain Redux Persist actions (FLUSH, REHYDRATE, etc.) don’t throw errors when data is saved or restored.
    }),
});

export default store;
