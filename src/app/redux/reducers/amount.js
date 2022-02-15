import { createSlice } from '@reduxjs/toolkit';
import { getAllAmountAsync, getByIdRegisterAsync, getWhereGoestAsync } from '../ActionsAsync/amountAA';

const init = {
  current: {
    data: {},
    ok: false,
    loading: false,
  },
  where: {
    data: {},
    ok: false,
    loading: false,
  },
  all: { loading: false, ok: false, data: {} },
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
        state.all.loading = true;
      })
      .addCase(getAllAmountAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(getAllAmountAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getByIdRegisterAsync.pending, (state) => {
        state.current.loading = true;
      })
      .addCase(getByIdRegisterAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(getByIdRegisterAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
      });

    builder
      .addCase(getWhereGoestAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereGoestAsync.fulfilled, (state, action) => {
        state.where = action.payload;
        state.where.loading = false;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(getWhereGoestAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });
  },
});

export const selectAllAmount = (state) => state.amount.all;
export const selectWhereAmount = (state) => state.amount.where;
export const selectCurrentAmount = (state) => state.amount.current;

export const { cheanAmount } = amountSlice.actions;

export default amountSlice.reducer;
