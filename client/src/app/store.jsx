import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import brickReducer from "../features/brick/brickSlice";
import alertSlice from "../features/alert/alertSlice";
import paymentSlice from "../features/payment/paymentSlice";
import loadingSlice from "../features/loading/loadingSlice";
import donorSlice from "../features/donor/donorSlice";
import adminSlice from "../features/admin/adminSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		brick: brickReducer,
		alert: alertSlice,
		payment: paymentSlice,
		loading: loadingSlice,
		donor: donorSlice,
		admin: adminSlice,
	},
});

export default store;
