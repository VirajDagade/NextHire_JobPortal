import { createSlice } from "@reduxjs/toolkit";
/*
 A slice is a way to manage a specific part of your application's state. It combines the state, reducers (functions to update the state), and actions (triggers for those updates) in one place.

 A slice is like a small section of the store that handles specific state and its updates.

The createSlice function is used to create a "slice" of the Redux store, which includes:

Name: "auth", used to identify this slice.
Initial State: { loading: "false" }, the default state for this slice.
Reducers: Functions that update the state based on actions.


*/
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      // Here, setLoading updates the loading property with the value provided in action.payload.
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
// The reducer function for this slice, which is combined with other reducers in the store.
