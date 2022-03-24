import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../../helpers/settings';

import {
  getAllGoestAsync,
  getWhereGoestAsync,
  getByIdGoestAsync,
  createGoestAsync,
  deleteGoestAsync,
  updateGoestAsync,
} from '../ActionsAsync/goestAA';


const goestSlice = createSlice({
  name: 'goest',
  initialState: JSON.parse(localStorage.getItem('goest')) || initialState,
  reducers: {
    cheanGoest: () => initialState,
    cleanAllGoest: (state) => ({ ...state, all: initialState.all }),
    cleanWhereGoest: (state) => ({ ...state, where: initialState.where }),
    cleanByIdGoest: (state) => ({ ...state, getById: initialState.getById }),
    cleanCreateGoest: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateGoest: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteGoest: (state) => ({ ...state, delete: initialState.delete }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllGoestAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllGoestAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(getAllGoestAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getByIdGoestAsync.pending, (state) => {
        state.getById.loading = true;
      })
      .addCase(getByIdGoestAsync.fulfilled, (state, action) => {
        state.getById.loading = false;
        state.getById = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(getByIdGoestAsync.rejected, (state, action) => {
        state.getById.loading = false;
        state.getById.error = action.payload;
      });

    builder
      .addCase(getWhereGoestAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereGoestAsync.fulfilled, (state, action) => {
        state.where.loading = false;
        state.where = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(getWhereGoestAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });

    builder
      .addCase(createGoestAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createGoestAsync.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(createGoestAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateGoestAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateGoestAsync.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(updateGoestAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteGoestAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteGoestAsync.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete = action.payload;
        localStorage.setItem('goest', JSON.stringify(state));
      })
      .addCase(deleteGoestAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectGoest = (state) => state.goest;
export const selectWhereGoest = (state) => state.goest.where;
export const selectgetByIdGoest = (state) => state.goest.getById;
export const selectCreateGoest = (state) => state.goest.create;
export const selectUpdateGoest = (state) => state.goest.update;
export const selectDeleteGoest = (state) => state.goest.delete;

export const {
  cheanGoest,
  cleanAllGoest,
  cleanByIdGoest,
  cleanCreateGoest,
  cleanDeleteGoest,
  cleanUpdateGoest,
  cleanWhereGoest,
} = goestSlice.actions;

export default goestSlice.reducer;
