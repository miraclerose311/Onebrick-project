import api from "../utils/api";
import { setOrder } from "../features/payment/paymentSlice";
import { setAlert } from "../features/alert/alertSlice";
import { clearLoading, setLoading } from "../features/loading/loadingSlice";

export const createOrder = (amount) => async (dispatch) => {
	dispatch(setLoading());
	const res = await api.post(
		"/payment/order",
		JSON.stringify({ amount: amount * 1000000 })
	);

	if (!res) {
		const errorAlert = {
			alertType: "error",
			content: "Server error. Are you online?",
		};
		dispatch(setAlert(errorAlert));
		return;
	}

	dispatch(setOrder(res.data));
	dispatch(clearLoading());
};
