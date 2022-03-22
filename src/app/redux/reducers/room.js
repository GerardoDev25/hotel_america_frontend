import { createSlice } from '@reduxjs/toolkit';

import {
  getAllRoomAsync,
  getByIdRoomAsync,
  getWhereRoomAsync,
  createRoomAsync,
  deleteRoomAsync,
  updateRoomAsync,
} from '../ActionsAsync/roomAA';

import { initialState } from '../../helpers/settings';

const roomSlice = createSlice({
  name: 'room',
  initialState: JSON.parse(localStorage.getItem('room')) || initialState,
  reducers: {
    cheanRoom: () => initialState,
    cleanAllRoom: (state) => ({ ...state, all: initialState.all }),
    cleanWhereRoom: (state) => ({ ...state, where: initialState.where }),
    cleanByIdRoom: (state) => ({ ...state, getById: initialState.getById }),
    cleanCreateRoom: (state) => ({ ...state, create: initialState.create }),
    cleanUpdateRoom: (state) => ({ ...state, update: initialState.update }),
    cleanDeleteRoom: (state) => ({ ...state, delete: initialState.delete }),
  },
  extraReducers(builder) {
    builder
      .addCase(getAllRoomAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllRoomAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(getAllRoomAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getWhereRoomAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereRoomAsync.fulfilled, (state, action) => {
        state.where.loading = false;
        state.where = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(getWhereRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getByIdRoomAsync.pending, (state) => {
        state.getById.loading = true;
      })
      .addCase(getByIdRoomAsync.fulfilled, (state, action) => {
        state.getById.loading = false;
        state.getById = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(getByIdRoomAsync.rejected, (state, action) => {
        state.getById.loading = false;
        state.getById.error = action.payload;
      });

    builder
      .addCase(createRoomAsync.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createRoomAsync.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(createRoomAsync.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(updateRoomAsync.pending, (state) => {
        state.update.loading = true;
      })
      .addCase(updateRoomAsync.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(updateRoomAsync.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload;
      });

    builder
      .addCase(deleteRoomAsync.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(deleteRoomAsync.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload;
      });
  },
});

export const selectAllRoom = (state) => state.room.all;
export const selectWhereRoom = (state) => state.room.where;
export const selectGetByIdRoom = (state) => state.room.getById;
export const selectCreateRoom = (state) => state.room.create;
export const selectUpdateRoom = (state) => state.room.update;
export const selectDeleteRoom = (state) => state.room.delte;

export const {
  //
  cheanRoom,
  cleanAllRoom,
  cleanWhereRoom,
  cleanByIdRoom,
  cleanCreateRoom,
  cleanUpdateRoom,
  cleanDeleteRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
