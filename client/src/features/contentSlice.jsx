import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: {},
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContents: (state, action) => {
      const res = action.payload;
      const newContents = {};
      res.forEach((item) => {
        newContents[item.name] = item.content;
      });
      return {
        ...state,
        contents: newContents,
      };
      // state.contents = action.payload;
    },
  },
});

export const { setContents } = contentSlice.actions;

export default contentSlice.reducer;
