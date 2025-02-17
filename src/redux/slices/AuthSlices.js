import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    CreateUserRequest: (state, action) => {
      state.loading = true;
    },
    CreateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    CreateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateUserRequest: (state, action) => {
      state.loading = true;
    },
    UpdateUserSuccess: (state) => {
      state.loading = false;
    },
    UpdateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignInRequest: (state, action) => {
      state.loading = true;
    },
    SignInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  CreateUserRequest, 
  CreateUserSuccess, 
  CreateUserFailure, 
  UpdateUserRequest, 
  UpdateUserSuccess, 
  UpdateUserFailure,
  SignInRequest,
  SignInSuccess,
  SignInFailure, 
} = authSlice.actions;

export default authSlice.reducer;