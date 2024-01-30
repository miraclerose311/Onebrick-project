import { createSlice } from '@reduxjs/toolkit';

const initialState = { alertType: null, content: '' };

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alertType = action.payload.alertType;
      state.content = action.payload.content;
    },

    removeAlert: (state) => {
      state.alertType = null;
      state.content = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, removeAlert } = alertSlice.actions;

export const setAlertWithTimeout = (alertData) => (dispatch) => {
  dispatch(setAlert(alertData));
  setTimeout(() => {
    dispatch(removeAlert());
  }, 1000);
};

export default alertSlice.reducer;
