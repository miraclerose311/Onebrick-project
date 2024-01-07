import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import brickReducer from "../features/brickSlice";
import alertSlice from "../features/alertSlice";
import paymentSlice from "../features/paymentSlice";
import loadingSlice from "../features/loadingSlice";
import donorSlice from "../features/donorSlice";
import adminSlice from "../features/adminSlice";
import contentSlice from "../features/contentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    brick: brickReducer,
    alert: alertSlice,
    payment: paymentSlice,
    loading: loadingSlice,
    donor: donorSlice,
    admin: adminSlice,
    content: contentSlice,
  },
});

export default store;
