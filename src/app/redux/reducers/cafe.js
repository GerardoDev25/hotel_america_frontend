import { createSlice } from '@reduxjs/toolkit';
import { getAllCafeAsync, getWhereCafeAsync } from '../ActionsAsync/cafeAA';
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
  all: { loading: false, ok: false, data: {} },
};

const cafeSlice = createSlice({
  name: 'cafe',
  initialState: JSON.parse(localStorage.getItem('cafe')) || init,
  reducers: {
    cheanCafe() {
      localStorage.removeItem('cafe');
      return init;
    },
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
  },
});

export const selectAllCafe = (state) => state.cafe.all;
export const selectWhereCafe = (state) => state.cafe.where;
export const selectCurrentCafe = (state) => state.cafe.current;

export const { cheanCafe } = cafeSlice.actions;

export default cafeSlice.reducer;
