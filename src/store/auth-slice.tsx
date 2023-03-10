/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { changePassword, sendLinkIfForgotPassword, userLogIn, userSignUp } from '../api/api-auth';
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
    resetLetterIsSent: false,
    passwordIsChanged: false,
    errorMessage: '',
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
    logOut(state) {
      state.token = '';
      state.user = null;
    },
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
      })
      .addCase(sendLinkIfForgotPassword.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(sendLinkIfForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error400 = false;
        state.errorAny = false;
        state.resetLetterIsSent = true;
        state.errorMessage = '';
      })
      .addCase(sendLinkIfForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.errorAny = true;
        state.resetLetterIsSent = false;
        state.errorMessage = action.error?.message;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
        state.errorAny = false;
        state.passwordIsChanged = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error400 = false;
        state.errorAny = false;
        state.passwordIsChanged = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorAny = true;
        state.passwordIsChanged = false;
      });
  },
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
