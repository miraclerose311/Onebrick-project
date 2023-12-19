import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fullName: "",
	mobile: "",
	email: "",
	pan: "",
	aadhaar: "",
	address: "",
	country: "",
	state: "",
	pin: "",
};

export const donorSlice = createSlice({
	name: "donor",
	initialState,
	reducers: {
		addDonorInfo: (state, action) => {
			state = Object.assign(state, action.payload);
		},
		clearDonor: (state) => {
			state.fullName = "";
			state.mobile = "";
			state.email = "";
			state.pan = "";
			state.aadhaar = "";
			state.address = "";
			state.country = "";
			state.state = "";
			state.pin = "";
		},
		setDonorInfo: (state, action) => {
			console.log("action.payload", action.payload);
			const { fullName, email, pan, country, address } = action.payload;
			const DonorData = { fullName, email, pan, country, address };
			return {
				...state,
				...DonorData,
			};
		},
	},
});

export const { addDonorInfo, setDonorInfo, clearDonor } = donorSlice.actions;

export default donorSlice.reducer;
