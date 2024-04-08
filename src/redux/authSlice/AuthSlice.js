import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../helper';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.registerUser, {
      onCompleted: (state, action) => {
        state.isLoading = false;
      },
      onPending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      onReject: (state, error) => {
        state.isLoading = false;
        state.error = error?.error
      },
    });
    addCaseWithLoading(builder, Actions.verifyEmail, {
      onCompleted: (state, action) => {
        state.isLoading = false;
      },
      onPending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      onReject: (state, error) => {
        state.isLoading = false;
        state.error = error?.error;
      },
    });
    addCaseWithLoading(builder, Actions.loginUser, {
      onCompleted: (state, action) => {
        state.isLoading = false;
      },
      onPending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      onReject: (state, error) => {
        state.isLoading = false;
        state.error = error?.error;
      },
    });
    addCaseWithLoading(builder, Actions.getUserDetail, {
      onCompleted: (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data
      },
      onPending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      onReject: (state, error) => {
        state.isLoading = false;
        state.error = error?.error;
      },
    });
  },
});

export default authSlice.reducer;