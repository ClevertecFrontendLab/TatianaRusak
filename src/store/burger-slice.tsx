import { createSlice } from '@reduxjs/toolkit';

const burgerSlice = createSlice({
  name: 'burger',
  initialState: {
    isOpened: false,
  },
  reducers: {
    changeMode(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = action.payload;
    },
  },
});

export const { changeMode } = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
