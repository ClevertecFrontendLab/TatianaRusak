import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IBookCard, IBookDetailed, ICategory, IResponceFail } from '../types';
import { HOST } from '../utils/constants';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const newConfig = config;

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const fetchBooks = createAsyncThunk<IBookCard[], undefined, { rejectValue: IResponceFail }>(
  'book/fetchBooks',

  async () => {
    try {
      const response = await axios.get(`${HOST}/api/books/`);

      if (response.status !== 200) {
        throw new Error(response.data);
      }

      return response.data;
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
