import { createSlice } from '@reduxjs/toolkit';
import { getAllGoestAsync, getWhereGoestAsync, getByIdGoestAsync } from '../ActionsAsync/goestAA';

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
        state.all.loading = true;
      })
      .addCase(getAllGoestAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getAllGoestAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
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
      .addCase(getByIdGoestAsync.pending, (state) => {
        state.current.loading = true;
      })
      .addCase(getByIdGoestAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getByIdGoestAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
      });
  },
});

export const selectGoest = (state) => state.goest;
export const selectWhereGoest = (state) => state.goest.where;
export const selectCurrentGoest = (state) => state.goest.current;

export const { cheanGoest } = goestSlice.actions;

export default goestSlice.reducer;
