import { createSlice } from '@reduxjs/toolkit';
import { getAllRoomAsync } from '../ActionsAsync/roomAA';

const init = {
  loading: false,
  rooms: null,
  error: null,
  ok: false,
  msg: '',
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
        state.loading = true;
      })
      .addCase(getAllRoomAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data.rows;
        state.pageCount = action.payload.data.pageCount;
        state.total = action.payload.data.total;
        state.ok = action.payload.ok;
        state.msg = action.payload.msg;
      })
      .addCase(getAllRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectRoom = (state) => state.room;

export const { cheanRoom } = roomSlice.actions;

export default roomSlice.reducer;
