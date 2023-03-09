/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userLogIn, userSignUp } from '../api/api-auth';
import { IAuthState } from '../types';

const getInitalState: () => IAuthState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const initialState = {
    loading: false,
    user: null,
    token: '',
    errorAny: false,
    error400: false,
  };

  if (token && user) {
    return {
      ...initialState,
      // isLoggedIn: true,
      token,
      user: JSON.parse(user),
    };
  }

  return {
    ...initialState,
    // isLoggedIn: false,
    token: '',
    // user: null,
  };
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: getInitalState(),
  reducers: {
    logOff(state) {
      // state.isLoggedIn = false;
      state.token = '';
      state.user = null;
    },
    // signIn(state, action: PayloadAction<ISignInOk>) {
    //   state.isLoggedIn = true;
    //   state.user = action.payload;
    //   state.token = action.payload.token;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        // state.isLoggedIn = true;
        state.token = action.payload.jwt;
        state.user = action.payload;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.user = null;
      })
      .addCase(userLogIn.pending, (state, action) => {
        state.loading = true;
        state.token = '';
        state.user = null;
      })
      .addCase(userLogIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.user = action.payload;
      })
      .addCase(userLogIn.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.user = null;
        if (action.payload?.response?.status === 400) {
          state.error400 = true;
        } else {
          state.errorAny = true;
        }
      });
  },
});

export const authReducer = authSlice.reducer;
