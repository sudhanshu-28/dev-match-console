import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      console.log("SSR state => ", state);
      console.log("SSR action => ", action);
    },
    removeUser: (state, action) => {
      console.log("SSR state => ", state);
      console.log("SSR action => ", action);
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
