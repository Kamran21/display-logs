import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "stats",
  initialState: {
    info: 0,
    warning: 0,
    error: 0,
  },
  reducers: {
    setStats(state, action) {
      const { info, warning, error } = action.payload;
      state.info = info;
      state.warning = warning;
      state.error = error;
    },
  },
});

export const { setStats } = slice.actions;

export default slice.reducer;
