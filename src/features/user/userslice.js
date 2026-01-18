import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersList: [],
  selectedUser: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setUser, setUsersList, setSelectedUser } = actions;
export default reducer;
