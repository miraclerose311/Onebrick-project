import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import brickReducer from "../features/brick/brickSlice";
import alertSlice from "../features/alert/alertSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		brick: brickReducer,
		alert: alertSlice,
	},
});

export default store;
