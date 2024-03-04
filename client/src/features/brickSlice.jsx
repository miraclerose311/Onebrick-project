import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {
    amount: 1,
    location: "I am a Resident Indian",
    dedication: {
      name: "",
      relationship: "",
      message: "",
      image: "",
    },
  },
  bricks: [],
  soldAmount: 0,
};

export const brickSlice = createSlice({
  name: "brick",
  initialState,
  reducers: {
    setBricks: (state, action) => {
      state.bricks = action.payload;
    },
    resetBricks: (state) => {
      state.bricks = initialState.bricks
    },
    setBrick: (state, action) => {
      const { purchasedIds, date, donor, user } = action.payload;
      const brickData = { donor, sold: true, date, user };
      return {
        ...state,
        bricks: state.bricks.map((brick) =>
          purchasedIds.includes(brick.brick_id)
            ? { ...brickData, brick_id: brick.brick_id }
            : brick
        ),
      };
    },
    setDedication: (state, action) => {
      const { name, relationship, message, image } = action.payload;
      const dedicationData = { name, relationship, message, image };
      return {
        ...state,
        bricks: state.bricks.map((brick) => {
          if (action.payload.bricks.includes(brick.brick_id)) {
            return { ...brick, dedication: dedicationData }; // Return a new brick object with updated dedication
          } else {
            return brick; // Return the untouched brick object
          }
        }),
      };
    },
    setSoldAmount: (state, action) => {
      state.soldAmount = action.payload;
    },
    setAmountOfReduce: (state, action) => {
      state.current.amount = action.payload;
    },
    clearAmount: (state) => {
      state.current.amount = 1;
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
  setAmountOfReduce,
  clearAmount,
  setDedication,
  clearCurrent,
  setLocation,
} = brickSlice.actions;

export default brickSlice.reducer;
