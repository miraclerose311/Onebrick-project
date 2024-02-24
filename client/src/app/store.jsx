import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import brickReducer from "../features/brickSlice";
import alertSlice from "../features/alertSlice";
import paymentSlice from "../features/paymentSlice";
import loadingSlice from "../features/loadingSlice";
import donorSlice from "../features/donorSlice";
import adminSlice from "../features/adminSlice";
import contentSlice from "../features/contentSlice";
import supportSlice from "../features/supportSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    alert: alertSlice,
    payment: paymentSlice,
    loading: loadingSlice,
    donor: donorSlice,
    admin: adminSlice,
    content: contentSlice,
    support: supportSlice,
    brick: brickReducer,
  },
});

export default store;
