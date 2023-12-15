import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  mobile: '',
  email: '',
  pan: '',
  aadhaar: '',
  address: '',
  country: '',
  state: '',
  pin: '',
};

export const donorSlice = createSlice({
  name: 'donor',
  initialState,
  reducers: {
    addDonorInfo: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    clearDonor: (state) => {
      state.fullName = '';
      state.mobile = '';
      state.email = '';
      state.pan = '';
      state.aadhaar = '';
      state.address = '';
      state.country = '';
      state.state = '';
      state.pin = '';
    },
  },
});

export const { addDonorInfo, clearDonor } = donorSlice.actions;

export default donorSlice.reducer;
