/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../hooks/use-typed-selector';
import { IBookCard, IBookDetailed, IBookState, ICategory, IResponceFail } from '../types';
import { HOST } from '../utils/constants';

export const fetchBooks = createAsyncThunk<IBookCard[], undefined, { rejectValue: IResponceFail }>(
  'book/fetchBooks',
  async () => {
    try {
      const responce = await axios.get(`${HOST}/api/books/`);

      if (responce.status !== 200) {
        throw new Error(responce.data);
      }

      return responce.data;
    } catch (error) {
      return (error as IResponceFail).error.message;
    }
  }
);

export const fetchCategories = createAsyncThunk<ICategory[], undefined, { rejectValue: IResponceFail }>(
  'book/fetchCategories',
  async () => {
    try {
      const responce = await axios.get(`${HOST}/api/categories`);

      if (responce.status !== 200) {
        throw new Error(responce.data);
      }

      return responce.data;
    } catch (error) {
      return (error as IResponceFail).error.message;
    }
  }
);

export const fetchSelectedBook = createAsyncThunk<IBookDetailed, string, { rejectValue: IResponceFail }>(
  'book/fetchSelectedBook',
  async (id) => {
    try {
      const responce = await axios.get(`${HOST}/api/books/${id}`);

      if (responce.status !== 200) {
        throw new Error(responce.data);
      }

      return responce.data;
    } catch (error) {
      return (error as IResponceFail).error.message;
    }
  }
);

const initialState: IBookState = {
  categories: [],
  allBooks: [],
  selectedBook: null,
  selectedCategory: 'all',
  loading: {
    fetchCategories: false,
    fetchBooks: false,
    fetchSelectedBook: false,
  },
  error: {
    fetchCategories: false,
    fetchBooks: false,
    fetchSelectedBook: false,
  },
  errorMessage: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading.fetchBooks = true;
        state.error.fetchBooks = false;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.allBooks = action.payload;
        state.loading.fetchBooks = false;
        state.error.fetchBooks = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error.fetchBooks = true;
        state.loading.fetchBooks = false;
      })
      .addCase(fetchSelectedBook.pending, (state) => {
        state.loading.fetchSelectedBook = true;
        state.error.fetchSelectedBook = false;
      })
      .addCase(fetchSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.loading.fetchSelectedBook = false;
        state.error.fetchSelectedBook = false;
      })
      .addCase(fetchSelectedBook.rejected, (state, action) => {
        state.loading.fetchSelectedBook = false;
        state.error.fetchSelectedBook = true;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading.fetchCategories = true;
        state.error.fetchCategories = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error.fetchCategories = false;
        state.loading.fetchCategories = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error.fetchCategories = true;
        state.loading.fetchCategories = false;
      });
  },
});

export const selectAllBooks = (state: RootState) => state.bookReducer.allBooks;
export const { setSelectedCategory } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
