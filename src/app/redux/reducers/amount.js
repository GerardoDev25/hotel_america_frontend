import { createSlice } from '@reduxjs/toolkit';
import { getAllAmountAsync } from '../ActionsAsync/amountAA';

const init = {
  loading: false,
  amounts: null,
  error: null,
  ok: false,
  msg: '',
};

const amountSlice = createSlice({
  name: 'amount',
  initialState: JSON.parse(localStorage.getItem('amount')) || init,
  reducers: {
    cheanAmount() {
      localStorage.removeItem('amount');
      return init;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAmountAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAmountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.msg = action.payload.msg;
        state.amounts = action.payload.data.rows;
        state.total = action.payload.data.total;
        state.pageCount = action.payload.data.pageCount;
      })
      .addCase(getAllAmountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAmount = (state) => state.amount;

export const { cheanAmount } = amountSlice.actions;

export default amountSlice.reducer;
