import { createSlice } from '@reduxjs/toolkit';
import { getAllStaffAsync } from '../ActionsAsync/staffAA';

const init = {
  loading: false,
  staffs: null,
  error: null,
  ok: false,
  msg: '',
};

const staffSlice = createSlice({
  name: 'staff',
  initialState: JSON.parse(localStorage.getItem('staff')) || init,
  reducers: {
    cheanStaff() {
      localStorage.removeItem('staff');
      return init;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStaffAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStaffAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.msg = action.payload.msg;
        state.total = action.payload.data.total;
        state.staffs = action.payload.data.rows;
        state.pageCount = action.payload.data.pageCount;
      })
      .addCase(getAllStaffAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectStaff = (state) => state.staff;

export const { cheanStaff } = staffSlice.actions;

export default staffSlice.reducer;
