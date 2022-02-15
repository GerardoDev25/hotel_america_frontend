import { createSlice } from '@reduxjs/toolkit';
import { getAllRoomAsync, getByIdRoomAsync, getWhereGoestAsync } from '../ActionsAsync/roomAA';

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
  all: { data: {}, ok: false, loading: false },
};

const roomSlice = createSlice({
  name: 'room',
  initialState: JSON.parse(localStorage.getItem('room')) || init,
  reducers: {
    cheanRoom() {
      localStorage.removeItem('room');
      return init;
    },
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
      .addCase(getByIdRoomAsync.pending, (state) => {
        state.current.loading = true;
      })
      .addCase(getByIdRoomAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(getByIdRoomAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
      });

    builder
      .addCase(getWhereGoestAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereGoestAsync.fulfilled, (state, action) => {
        state.where.loading = false;
        state.where = action.payload;
        localStorage.setItem('room', JSON.stringify(state));
      })
      .addCase(getWhereGoestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllRoom = (state) => state.room.all;
export const selectWhereRoom = (state) => state.room.where;
export const selectCurrentRoom = (state) => state.room.current;

export const { cheanRoom } = roomSlice.actions;

export default roomSlice.reducer;
