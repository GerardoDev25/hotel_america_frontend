import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../../helpers/settings';

import {
  getAllStaffAsync,
  getByIdStaffAsync,
  getWhereStaffAsync,
  createStaffAsync,
  deleteStaffAsync,
  updateStaffAsync,
} from '../ActionsAsync/staffAA';

const staffSlice = createSlice({
  name: 'staff',
  initialState: JSON.parse(localStorage.getItem('staff')) || initialState,
  reducers: {
    cheanStaff: () => initialState,
    cleanAllStaff: (state) => ({ ...state, all: initialState.all }),
    cleanWhereStaff: (state) => ({ ...state, where: initialState.where }),
    cleanByIdStaff: (state) => ({ ...state, getById: initialState.getById }),
    cleanCreateStaff: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateStaff: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteStaff: (state) => ({ ...state, delete: initialState.delete }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStaffAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllStaffAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(getAllStaffAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getByIdStaffAsync.pending, (state) => {
        state.getById.loading = true;
      })
      .addCase(getByIdStaffAsync.fulfilled, (state, action) => {
        state.getById.loading = false;
        state.getById = action.payload;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(getByIdStaffAsync.rejected, (state, action) => {
        state.getById.loading = false;
        state.getById.error = action.payload;
      });

    builder
      .addCase(getWhereStaffAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereStaffAsync.fulfilled, (state, action) => {
        state.where.loading = false;
        state.where = action.payload;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(getWhereStaffAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createStaffAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createStaffAsync.fulfilled, (state, action) => {
        state.create = action.payload;
        state.create.loading = false;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(createStaffAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateStaffAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateStaffAsync.fulfilled, (state, action) => {
        state.update = action.payload;
        state.update.loading = false;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(updateStaffAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteStaffAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteStaffAsync.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.delete.loading = false;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(deleteStaffAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectAllStaff = (state) => state.staff.all;
export const selectWhereStaff = (state) => state.staff.where;
export const selectGetByIdStaff = (state) => state.staff.getById;
export const selectCreateStaff = (state) => state.staff.create;
export const selectUpdateStaff = (state) => state.staff.update;
export const selectDeleteStaff = (state) => state.staff.delete;

export const {
  cheanStaff,
  cleanAllStaff,
  cleanByIdStaff,
  cleanCreateStaff,
  cleanDeleteStaff,
  cleanUpdateStaff,
  cleanWhereStaff,
} = staffSlice.actions;

export default staffSlice.reducer;
