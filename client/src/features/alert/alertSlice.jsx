import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const id = uuidv4();
      const newAlert = {
        id,
        alertType: action.payload.alertType,
        content: action.payload.content,
      };
      console.log('Calling setAlert');
      console.log(action.payload);
      state.push(newAlert);
      setTimeout(() => {
        const index = state.findIndex((alert) => alert.id === id);
        removeAlert(index);
      }, 5000);
    },

    removeAlert: (state, action) => {
      const { index } = action.payload;
      state.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
