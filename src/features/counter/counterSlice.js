import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state, atcion) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    incByValue: (state, action) => {
      console.log(action);
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incByValue } = counterSlice.actions;
export default counterSlice.reducer;
