import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    addToHistory: (state, action) => {
      if (!state.history.includes(action.payload)) {
        state.history.push(action.payload);
      }
    },
  },
});

export const { setHistory, addToHistory } = historySlice.actions;
export default historySlice.reducer;