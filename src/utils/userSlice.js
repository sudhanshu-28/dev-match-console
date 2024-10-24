import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      const { payload } = action;
      state = payload;
      return state;
    },
    removeUser: (state) => {
      state = null;
      return state;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
