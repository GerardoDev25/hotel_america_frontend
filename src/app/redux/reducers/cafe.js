import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../../helpers/settings';

import { createCafeAsync, getAllCafeAsync, getWhereCafeAsync, updateCafeAsync } from '../ActionsAsync/cafeAA';

const cafeSlice = createSlice({
  name: 'cafe',
  initialState: JSON.parse(localStorage.getItem('cafe')) || initialState,
  reducers: {
    cheanCafe: () => initialState,
    cleanAllCafe: (state) => ({ ...state, all: initialState.all }),
    cleanWhereCafe: (state) => ({ ...state, where: initialState.where }),
    cleanCreateCafe: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateCafe: (state) => ({ ...state, update: initialState.update }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCafeAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllCafeAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('cafe', JSON.stringify(state));
      })
      .addCase(getAllCafeAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getWhereCafeAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereCafeAsync.fulfilled, (state, action) => {
        state.where = action.payload;
        state.where.loading = false;
        localStorage.setItem('cafe', JSON.stringify(state));
      })
      .addCase(getWhereCafeAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });

    builder
      .addCase(createCafeAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createCafeAsync.fulfilled, (state, action) => {
        state.create = action.payload;
        state.create.loading = false;
        localStorage.setItem('cafe', JSON.stringify(state));
      })
      .addCase(createCafeAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateCafeAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateCafeAsync.fulfilled, (state, action) => {
        state.update = action.payload;
        state.update.loading = false;
        localStorage.setItem('cafe', JSON.stringify(state));
      })
      .addCase(updateCafeAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });
  },
});

export const selectAllCafe = (state) => state.cafe.all;
export const selectWhereCafe = (state) => state.cafe.where;
export const selectCreateCafe = (state) => state.cafe.create;
export const selectUpdateCafe = (state) => state.cafe.update;

export const { cheanCafe, cleanAllCafe, cleanCreateCafe, cleanUpdateCafe, cleanWhereCafe } = cafeSlice.actions;

export default cafeSlice.reducer;
