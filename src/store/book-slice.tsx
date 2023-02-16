/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../hooks/use-typed-selector';
import { IBookCard, IBookDetailed, IBookState, ICategory } from '../types';
import { HOST } from '../utils/constants';

export const fetchBooks = createAsyncThunk<IBookCard[], undefined, { rejectValue: string }>(
  'book/fetchBooks',
  async () => {
    try {
      const responce = await axios.get(`${HOST}/api/books/`);

      return responce.data;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

export const fetchSelectedBook = createAsyncThunk<IBookDetailed, number, { rejectValue: string }>(
  'book/fetchSelectedBook',
  async (id) => {
    try {
      const responce = await axios.get(`${HOST}/api/books/${id}`);

      return responce.data;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

export const fetchCategories = createAsyncThunk<ICategory[], undefined, { rejectValue: string }>(
  'book/fetchCategories',
  async () => {
    try {
      const responce = await axios.get(`${HOST}/api/categories`);

      return responce.data;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

const initialState: IBookState = {
  categories: [],
  allBooks: [],
  loading: false,
  selectedBookId: null,
  selectedBook: null,
  error: false,
  errorMessage: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBookId(state, action) {
      state.selectedBookId = action.payload;
    },
    setSelectedBook(state, action) {
      state.selectedBook = action.payload;
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
      })
      .addCase(fetchSelectedBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSelectedBook.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const selectAllBooks = (state: RootState) => state.bookReducer.allBooks;
export const { setSelectedBookId, setSelectedBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
