import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: !!localStorage.getItem("user"),
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			console.log("Google login function");
			console.log("payload => ", action.payload._id);
			localStorage.setItem("token", action.payload.token);
			state.isAuthenticated = true;
			state.token = action.payload.token
		},
		logout: (state) => {
			localStorage.clear();
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
