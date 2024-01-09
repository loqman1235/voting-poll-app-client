import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "../features/pollSlice";

const store = configureStore({
  reducer: {
    polls: pollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
