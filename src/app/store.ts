import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
