import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: !!localStorage.getItem("token"),
	profile: {},
	avatar: localStorage.getItem("avatar")
		? localStorage.getItem("avatar")
		: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("avatar", action.payload.picture);
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.avatar = action.payload.picture;
		},
		logout: (state) => {
			localStorage.clear();
			state.token = null;
			state.isAuthenticated = false;
			state.avatar = "";
		},
		setProfile: (state, action) => {
			state.profile = action.payload;
		},
		clearProfile: (state) => {
			state.profile = {};
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, setProfile, clearProfile } = authSlice.actions;

export default authSlice.reducer;
