import { configureStore } from '@reduxjs/toolkit';

import { burgerReducer } from './burger-slice';

export const store = configureStore({
  reducer: {
    burgerReducer,
  },
});
