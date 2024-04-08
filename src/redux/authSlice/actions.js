import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, patch, postWithoutToken } from '../../apiService';


export const registerUser = createAsyncThunk(
  'auth/register',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`auth/signup`, payload));
    }),
);

export const verifyEmail = createAsyncThunk(
  'auth/verify-otp',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(patch(`auth/verify-otp/${payload.otp}`));
    }),
);

export const resendOtpCode = createAsyncThunk(
  'auth/resend-verification-otp',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(patch(`auth/resend-verification-otp`, payload));
    }),
);

export const loginUser = createAsyncThunk(
  'auth/login',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`auth/login`, payload));
    }),
);

export const forgotPassword = createAsyncThunk(
  'auth/forget-password',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`auth/forget-password`, payload));
    }),
);

export const verifyOtpReset = createAsyncThunk(
  'auth/verify-fp-otp',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`auth/verify-fp-otp/${payload.otp}`));
    }),
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  ({ payload,resetToken }) =>
    new Promise((resolve, reject) => {
      resolve(postWithoutToken(`auth/reset-password/${resetToken}`, payload));
    }),
);

export const getUserDetail = createAsyncThunk(
  'user/me',
  ({ payload }) =>
    new Promise((resolve, reject) => {
      resolve(get(`user/me`));
    }),
);