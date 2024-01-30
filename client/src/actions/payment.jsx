import api from "../utils/api";
import { setOrder } from "../features/paymentSlice";
import { setAlert } from "../features/alertSlice";
import { clearLoading, setLoading } from "../features/loadingSlice";

export const createOrder = (amount) => async (dispatch) => {
  try {
    // Dispatch setLoading before starting the API call
    dispatch(setLoading());

    // Convert the amount and send the request to the server
    const res = await api.post(
      "/payment/order",
      JSON.stringify({ amount: amount * 100000 })
    );

    // Assuming res is truthy if the request succeeded, dispatch setOrder with the data received.
    dispatch(setOrder(res.data));
  } catch (error) {
    // If there was an error during the API call or the server response is falsy,
    // dispatch the error alert.
    const errorAlert = {
      alertType: "error",
      content: "Server error. Are you online?",
    };
    dispatch(setAlert(errorAlert));
  } finally {
    // Clearing loading state should happen in both success and failure scenarios.
    dispatch(clearLoading());
  }
};

