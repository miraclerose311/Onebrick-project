import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import brickReducer from '../features/brick/brickSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    brick: brickReducer
  },
});

export default store;
