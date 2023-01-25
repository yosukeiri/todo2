import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface TODO {
  id: string;
  title: string;
  status: "Waiting" | "Working" | "Completed";
  detail: string;
  deadline: string;
  createdDate: any;
  updateDate: any;
}
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: {
      id: "",
      title: "",
      status: "",
      detail: "",
      deadline: "",
      createdDate: "",
      updateDate: "",
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateTodo: (state, action: PayloadAction<TODO>) => {
      state.todo.id = action.payload.id;
      state.todo.title = action.payload.title;
      state.todo.status = action.payload.status;
      state.todo.detail = action.payload.detail;
      state.todo.deadline = action.payload.deadline;
      state.todo.createdDate = action.payload.createdDate;
      state.todo.updateDate = action.payload.updateDate;
    },
  },
});

export const { updateTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.todo;

export default todoSlice.reducer;
