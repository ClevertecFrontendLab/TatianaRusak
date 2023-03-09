import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { IResponceFail } from '../types';
import { HOST } from '../utils/constants';

export interface IUserSignUpData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ISignUpResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export interface ISignUpError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

export interface IUserLogInData {
  identifier: string;
  password: string;
}

export const userSignUp = createAsyncThunk<ISignUpResponse, IUserSignUpData, { rejectValue: ISignUpError }>(
  'authentication/sighUp',

  async (userData) => {
    try {
      const response = await axios.post(`${HOST}/api/auth/local/register`, userData);

      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      return (error as ISignUpError).error.message;
    }
  }
);

export const userLogIn = createAsyncThunk<ISignUpResponse, IUserLogInData, { rejectValue: AxiosError }>(
  'authentication/logIn',

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${HOST}/api/auth/local`, userData);

      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);
