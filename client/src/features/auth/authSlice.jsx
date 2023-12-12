import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  profile: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.isAuthenticated = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setProfile, clearProfile } = authSlice.actions;

export default authSlice.reducer;
