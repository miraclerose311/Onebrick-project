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
		setSupportWord: (state, action) => {
			if (action.payload) {
				state.supportWords.push(action.payload);
			}
		},
	},
});

export const { setSupportWords, setSupportWord } = supportSlice.actions;

export default supportSlice.reducer;
