/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../hooks/use-typed-selector';
import { IBookCard, IBookState } from '../types';
import { HOST } from '../utils/constants';

export const fetchBooks = createAsyncThunk<IBookCard[], undefined, { rejectValue: string }>(
  'book/fetchBooks',
  async () => {
    try {
      const responce = await axios.get(`${HOST}api/books/`);

      // console.log('responce.data', responce.data);

      return responce.data;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

const initialState: IBookState = {
  allBooks: [],
  loading: false,
  selectedBookId: null,
  error: false,
  errorMessage: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBook(state, action) {
      state.selectedBookId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.allBooks = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = true;
        state.errorMessage = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectAllBooks = (state: RootState) => state.bookReducer.allBooks;
export const { setSelectedBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
