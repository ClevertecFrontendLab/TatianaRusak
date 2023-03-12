import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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

export interface IForgotPasswordResponse {
  ok: true;
}

export interface IForgotPasswordData {
  email: string;
}

export interface IChangePasswordData {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export const userSignUp = createAsyncThunk<ISignUpResponse, IUserSignUpData, { rejectValue: AxiosError }>(
  'authentication/sighUp',

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${HOST}/api/auth/local/register`, userData);

      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);

export const userLogIn = createAsyncThunk<ISignUpResponse, IUserLogInData, { rejectValue: AxiosError }>(
  'authentication/login',

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

export const sendLinkIfForgotPassword = createAsyncThunk<
  IForgotPasswordResponse,
  IForgotPasswordData,
  { rejectValue: AxiosError }
>(
  'authentication/forgotPassword',

  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${HOST}/api/auth/forgot-password`, userEmail);

      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);

export const changePassword = createAsyncThunk<ISignUpResponse, IChangePasswordData, { rejectValue: AxiosError }>(
  'authentication/changePassword',

  async (newPasswordData, { rejectWithValue }) => {
    console.log('замена произошла');

    try {
      const response = await axios.post(`${HOST}/api/auth/reset-password`, newPasswordData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);
