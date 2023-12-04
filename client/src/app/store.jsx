import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import brickReducer from '../features/brick/brickSlice';
import logger from 'redux-logger'

const store = configureStore({
  reducer: {
    auth: authReducer,
    brick: brickReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
