import { createSlice } from '@reduxjs/toolkit';
import {
  getAllLodgingAsync,
  getWhereLodgingAsync,
  createLodgingAsync,
  deleteLodgingAsync,
  updateLodgingAsync,
} from '../ActionsAsync/lodgingAA';

import { initialState } from '../../helpers/settings';

const lodgingSlice = createSlice({
  name: 'lodging',
  initialState: JSON.parse(localStorage.getItem('lodging')) || initialState,
  reducers: {
    cheanLodging: () => initialState,
    cleanAllLodging: (state) => ({ ...state, all: initialState.all }),
    cleanWhereLodging: (state) => ({ ...state, where: initialState.where }),
    cleanCreateLodging: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateLodging: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteLodging: (state) => ({ ...state, delete: initialState.delete }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllLodgingAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllLodgingAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('lodging', JSON.stringify(state));
      })
      .addCase(getAllLodgingAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getWhereLodgingAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereLodgingAsync.fulfilled, (state, action) => {
        state.where = action.payload;
        state.where.loading = false;
        localStorage.setItem('lodging', JSON.stringify(state));
      })
      .addCase(getWhereLodgingAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });

    builder
      .addCase(createLodgingAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createLodgingAsync.fulfilled, (state, action) => {
        state.create = action.payload;
        state.create.loading = false;
        localStorage.setItem('loading', JSON.stringify(state));
      })
      .addCase(createLodgingAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateLodgingAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateLodgingAsync.fulfilled, (state, action) => {
        state.update = action.payload;
        state.update.loading = false;
        localStorage.setItem('loading', JSON.stringify(state));
      })
      .addCase(updateLodgingAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteLodgingAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteLodgingAsync.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.delete.loading = false;
        localStorage.setItem('loading', JSON.stringify(state));
      })
      .addCase(deleteLodgingAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectAllLodging = (state) => state.lodging.all;
export const selectWhereLodging = (state) => state.lodging.where;
export const selectCreateLodging = (state) => state.lodging.create;
export const selectUpdateLodging = (state) => state.lodging.update;
export const selectDeleteLodging = (state) => state.lodging.delete;

export const {
  //
  cheanLodging,
  cleanAllLodging,
  cleanCreateLodging,
  cleanDeleteLodging,
  cleanUpdateLodging,
  cleanWhereLodging,
} = lodgingSlice.actions;

export default lodgingSlice.reducer;
