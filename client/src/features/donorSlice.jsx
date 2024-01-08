import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  donorInfo: {},
  currentDonors: [],
};

export const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {
    setCurrentDonors: (state, action) => {
      state.currentDonors = action.payload;
    },
    addDonorInfo: (state, action) => {
      state.donorInfo = { ...state.donorInfo, ...action.payload };
    },
    clearDonor: (state) => {
      state.donorInfo = state.initialState;
    },
    setDonorInfo: (state, action) => {
      state.donorInfo = action.payload;
    },
  },
});

export const { addDonorInfo, setDonorInfo, setCurrentDonors, clearDonor } =
  donorSlice.actions;

export default donorSlice.reducer;
