/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	brick: {
		id: "",
		amount: 1,
		dedication: {
			name: "",
			relationship: "",
			message: "",
			image: "",
		},
	},
	donor: {
		id: "",
		fullName: "",
		mobile: "",
		email: "",
		pan: "",
		aadhaar: "",
		address: "",
		location: "",
		country: "",
		state: "",
		pin: "",
	},
	bricks: [],
	soldAmount: 0,
	loading: true,
	clicked: "",
};

export const brickSlice = createSlice({
	name: "brick",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setBricks: (state, action) => {
			state.bricks = action.payload;
			state.loading = false;
		},
		soldBrick: (state, action) => {
			// const todo = state.bricks[action.payload.index];
			// todo.sold = 1;
			console.log(action.payload.index, action.payload.todo);
			state.bricks[action.payload.index] = action.payload.todo;
		},
		clearDonor: (state) => {
			state.donor = initialState.donor;
		},
		setSoldAmount: (state, action) => {
			state.soldAmount = action.payload;
		},
		increaseAmount: (state) => {
			state.brick.amount += 1;
		},
		decreaseAmount: (state) => {
			state.brick.amount -= 1;
		},
		changeLocation: (state, action) => {
			state.brick.location = action.payload;
		},
		add_donor_info: (state, action) => {
			// state.donor = action.payload
			state.donor = Object.assign(state.donor, action.payload);
		},
		add_donor_address: (state, action) => {
			state.brick.donor_address = action.payload;
		},
		add_dedication: (state, action) => {
			state.brick.dedication = action.payload;
		},
		clear_brick: (state) => {
			state.brick = initialState.brick;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setBricks,
	setLoading,
	soldBrick,
	setSoldAmount,
	changeClicked,
	increaseAmount,
	decreaseAmount,
	changeLocation,
	clearDonor,
	add_donor_info,
	add_donor_address,
	add_dedication,
	clear_brick,
} = brickSlice.actions;

export default brickSlice.reducer;
