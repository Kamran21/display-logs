import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "logs",
  initialState: {
    lines: [],
  },
  reducers: {
    loadLogs(state, action) {
      state.lines = action.payload;
    },
    addLog(state, action) {
      state.lines.push(action.payload);
    },
  },
});

export const { loadLogs, addLog } = slice.actions;

export default slice.reducer;
