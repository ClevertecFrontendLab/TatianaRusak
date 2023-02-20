import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { bookReducer } from './book-slice';
import { burgerReducer } from './burger-slice';

export const store = configureStore({
  reducer: { bookReducer, burgerReducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
