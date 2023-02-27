import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IBookCard, IBookDetailed, ICategory, IResponceFail } from '../types';
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
