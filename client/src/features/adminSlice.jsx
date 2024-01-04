import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sold: 0,
  donor: 0,
  img: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSoldBrickAmount: (state, action) => {
      state.sold = action.payload;
    },
    setDonorAmount: (state, action) => {
      state.donor = action.payload;
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
