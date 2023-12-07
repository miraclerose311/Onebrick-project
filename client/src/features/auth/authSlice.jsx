/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// token: localStorage.getItem('token'),
	isAuthenticated: !!localStorage.getItem("user"),
	currentUser: {},
	profiled: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			console.log("Google login function");
			console.log("payload => ", action.payload._id);
			localStorage.setItem("user", action.payload._id);
			state.currentUser = action.payload;
			// state.token = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state, action) => {
			localStorage.clear();
			state.token = null;
			state.isAuthenticated = false;
		},
		setIsProfiled: (state, action) => {
			state.profiled = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, setIsProfiled } = authSlice.actions;

export default authSlice.reducer;
