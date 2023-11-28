import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      localStorage.removeItem('token', action.payload);
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
