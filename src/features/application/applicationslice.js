import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  application: {},
  applications: [],
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.application = action.payload;
    },
    setAllApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});
const { reducer, actions } = applicationSlice;
export const { setApplications, setAllApplications } = actions;
export default reducer;
