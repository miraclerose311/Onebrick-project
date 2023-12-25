import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sold: 0,
  fakesold: 0,
  donor: 0,
  fakedonor: 0,
  img: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSoldBrickAmount: (state, action) => {
      const { sold, fakesold } = action.payload;
      return {
        ...state,
        sold,
        fakesold,
      };
    },
    setDonorAmount: (state, action) => {
      const { donor, fakedonor } = action.payload;
      return {
        ...state,
        donor,
        fakedonor,
      };
    },
    setImg: (state, action) => {
      return {
        ...state,
        img: action.payload,
      };
    },
  },
});

export const { setSoldBrickAmount, setDonorAmount } = adminSlice.actions;

export default adminSlice.reducer;
