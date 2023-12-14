import api from '../utils/api';
import { setOrder } from '../features/payment/paymentSlice';
import { setAlert } from '../features/alert/alertSlice';

export const createOrder = (amount) => async (dispatch) => {
  const res = await api.post(
    '/payment/order',
    JSON.stringify({ amount: amount * 1000 })
  );

  if (!res) {
    const errorAlert = {
      alertType: 'error',
      content: 'Server error. Are you online?',
    };
    dispatch(setAlert(errorAlert));
    return;
  }

  dispatch(setOrder(res.data));
};
