import { createSlice } from '@reduxjs/toolkit';
import { getAllStaffAsync, getByIdStaffAsync, getWhereStaffAsync } from '../ActionsAsync/staffAA';

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
        state.current.loading = true;
      })
      .addCase(getByIdStaffAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('staff', JSON.stringify(state));
      })
      .addCase(getByIdStaffAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
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
  },
});

export const selectAllStaff = (state) => state.staff.all;
export const selectWhereStaff = (state) => state.staff.where;
export const selectCurrentStaff = (state) => state.staff.current;

export const { cheanStaff } = staffSlice.actions;

export default staffSlice.reducer;
