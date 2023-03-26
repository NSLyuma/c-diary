import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, UserData } from '../../types';
import * as authApi from './authApi';

const initialState: AuthState = {
  userName: '',
  isAuth: false,
  error: undefined,
};

export const enter = createAsyncThunk(
  'auth/enter',
  async (userData: UserData) => {
    const data = await authApi.requestEnter(userData);
    return data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enter.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.isAuth = action.payload.isAuth;
      })
      .addCase(enter.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
