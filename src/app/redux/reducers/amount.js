import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../../helpers/settings';

import {
  getAllAmountAsync,
  getByIdAmountAsync,
  getWhereAmountAsync,
  createAmountAsync,
  deleteAmountAsync,
  updateAmountAsync,
} from '../ActionsAsync/amountAA';

const amountSlice = createSlice({
  name: 'amount',
  initialState: JSON.parse(localStorage.getItem('amount')) || initialState,
  reducers: {
    cheanAmount: () => initialState,
    cleanAllAmount: (state) => ({ ...state, all: initialState.all }),
    cleanWhereAmount: (state) => ({ ...state, where: initialState.where }),
    cleanByIdAmount: (state) => ({ ...state, getById: initialState.getById }),
    cleanCreateAmount: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateAmount: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteAmount: (state) => ({ ...state, delete: initialState.delete }),
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
      .addCase(getByIdAmountAsync.pending, (state) => {
        state.current.loading = true;
      })
      .addCase(getByIdAmountAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(getByIdAmountAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
      });

    builder
      .addCase(getWhereAmountAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereAmountAsync.fulfilled, (state, action) => {
        state.where = action.payload;
        state.where.loading = false;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(getWhereAmountAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });

    builder
      .addCase(createAmountAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createAmountAsync.fulfilled, (state, action) => {
        state.create = action.payload;
        state.create.loading = false;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(createAmountAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateAmountAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateAmountAsync.fulfilled, (state, action) => {
        state.update = action.payload;
        state.update.loading = false;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(updateAmountAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteAmountAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteAmountAsync.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.delete.loading = false;
        localStorage.setItem('amount', JSON.stringify(state));
      })
      .addCase(deleteAmountAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectAllAmount = (state) => state.amount.all;
export const selectWhereAmount = (state) => state.amount.where;
export const selectGetByIdAmount = (state) => state.amount.getById;
export const selectCreateAmount = (state) => state.amount.create;
export const selectUpdateAmount = (state) => state.amount.update;
export const selectDeleteAmount = (state) => state.amount.delete;

export const {
  cheanAmount,
  cleanAllAmount,
  cleanByIdAmount,
  cleanCreateAmount,
  cleanDeleteAmount,
  cleanUpdateAmount,
  cleanWhereAmount,
} = amountSlice.actions;

export default amountSlice.reducer;
