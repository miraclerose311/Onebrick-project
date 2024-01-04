import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: {
    amount: '',
    order_id: '',
    currency: '',
  },
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order.amount = action.payload.amount;
      state.order.order_id = action.payload.id;
      state.order.currency = action.payload.currency;
    },
    clearOrder: (state) => {
      state.order.amount = '';
      state.order.order_id = '';
      state.order.currency = '';
    },
  },
});

export const { setOrder, clearOrder } = paymentSlice.actions;

export default paymentSlice.reducer;
