import { configureStore } from "@reduxjs/toolkit";
import logsReducer from "./Logs/logs.slice";
import statsReducer from "./Stats/stats.slice";

const store = configureStore({
  reducer: {
    logs: logsReducer,
    stats: statsReducer,
  },
});

export default store;
