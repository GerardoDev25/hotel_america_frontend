import { createSlice } from '@reduxjs/toolkit';
import { getAllGoestAsync } from '../ActionsAsync/goestAA';

const init = {
  loading: false,
  goests: null,
  error: null,
  ok: false,
  msg: '',
};

const goestSlice = createSlice({
  name: 'goest',
  initialState: JSON.parse(localStorage.getItem('goest')) || init,
  reducers: {
    cheanGoest() {
      localStorage.removeItem('goest');
      return init;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllGoestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGoestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.msg = action.payload.msg;
        state.goests = action.payload.data.rows;
        state.total = action.payload.data.total;
        state.pageCount = action.payload.data.pageCount;
      })
      .addCase(getAllGoestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectGoest = (state) => state.goest;

export const { cheanGoest } = goestSlice.actions;

export default goestSlice.reducer;
