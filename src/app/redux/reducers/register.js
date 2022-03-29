import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../../helpers/settings';

import {
  getAllRegisterAsync,
  getByIdRegisterAsync,
  getWhereGoestAsync,
  createRegisterAsync,
  deleteRegisterAsync,
  updateRegisterAsync,
} from '../ActionsAsync/registerAA';

const registerSlice = createSlice({
  name: 'register',
  initialState: JSON.parse(localStorage.getItem('register')) || initialState,
  reducers: {
    cheanRegister: () => initialState,
    cleanAllRegister: (state) => ({ ...state, all: initialState.all }),
    cleanWhereRegister: (state) => ({ ...state, where: initialState.where }),
    cleanByIdRegister: (state) => ({ ...state, getById: initialState.getById }),
    cleanCreateRegister: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateRegister: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteRegister: (state) => ({ ...state, delete: initialState.delete }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllRegisterAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllRegisterAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getAllRegisterAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getByIdRegisterAsync.pending, (state) => {
        state.getById.loading = true;
      })
      .addCase(getByIdRegisterAsync.fulfilled, (state, action) => {
        state.getById.loading = false;
        state.getById = action.payload;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getByIdRegisterAsync.rejected, (state, action) => {
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
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getWhereGoestAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });

    builder
      .addCase(createRegisterAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createRegisterAsync.fulfilled, (state, action) => {
        state.create = action.payload;
        state.create.loading = false;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(createRegisterAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateRegisterAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateRegisterAsync.fulfilled, (state, action) => {
        state.update = action.payload;
        state.update.loading = false;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(updateRegisterAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteRegisterAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteRegisterAsync.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.delete.loading = false;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(deleteRegisterAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectAllRegister = (state) => state.register.all;
export const selectWhereRegister = (state) => state.register.where;
export const selectGetByIdRegister = (state) => state.register.getById;
export const selectCreateRegister = (state) => state.register.create;
export const selectUpdateRegister = (state) => state.register.update;
export const selectDeleteRegister = (state) => state.register.delete;
export const {
  cheanRegister,
  cleanAllRegister,
  cleanByIdRegister,
  cleanCreateRegister,
  cleanDeleteRegister,
  cleanUpdateRegister,
  cleanWhereRegister,
} = registerSlice.actions;

export default registerSlice.reducer;
