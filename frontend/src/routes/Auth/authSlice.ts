import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, UserData } from '../../types';
import * as authApi from './authApi';

const initialState: AuthState = {
  userName: '',
  isAuth: false,
  error: undefined,
};

export const getUser = createAsyncThunk('auth/user', async () => {
  const data = await authApi.requestIsAuth();
  return data;
});

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
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.error = action.payload.error;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
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
