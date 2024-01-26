import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	supportWords: [],
};

export const supportSlice = createSlice({
	name: "support",
	initialState,
	reducers: {
		setSupportWords: (state, action) => {
			if (action.payload) {
				state.supportWords = action.payload;
			}
		},
	},
});

export const { setSupportWords } = supportSlice.actions;

export default supportSlice.reducer;
