import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {
    amount: 1,
    location: 0,
    dedication: {
      name: '',
      relationship: '',
      message: '',
      image: '',
    },
  },
  bricks: [],
  soldAmount: 0,
};

export const brickSlice = createSlice({
  name: 'brick',
  initialState,
  reducers: {
    setBricks: (state, action) => {
      state.bricks = action.payload;
      state.loading = false;
    },
    setBrick: (state, action) => {
      const brickData = { ...action.payload, sold: true };
      return {
        ...state,
        bricks: state.bricks.map((brick) =>
          brick.brick_id === action.payload.brick_id ? brickData : brick
        ),
      };
    },
    setSoldAmount: (state, action) => {
      state.soldAmount = action.payload;
    },
    increaseAmount: (state) => {
      state.current.amount += 1;
    },
    decreaseAmount: (state) => {
      state.current.amount -= 1;
    },
    clearAmount: (state) => {
      state.current.amount = '1';
    },
    addDedication: (state, action) => {
      state.current.dedication = action.payload;
    },
    clearCurrent: (state) => {
      state.current = initialState.current;
    },
    setLocation: (state, action) => {
      state.current.location = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBricks,
  setBrick,
  setSoldAmount,
  increaseAmount,
  decreaseAmount,
  clearAmount,
  addDedication,
  clearCurrent,
  setLocation,
} = brickSlice.actions;

export default brickSlice.reducer;
