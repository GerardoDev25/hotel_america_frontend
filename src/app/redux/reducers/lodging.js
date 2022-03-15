import { createSlice } from '@reduxjs/toolkit';
import { getAllLodgingAsync, getByIdLodgingAsync, getWhereLodgingAsync } from '../ActionsAsync/lodgingAA';

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

const lodgingSlice = createSlice({
  name: 'lodging',
  initialState: JSON.parse(localStorage.getItem('lodging')) || init,
  reducers: {
    cheanLodging() {
      localStorage.removeItem('lodging');
      return init;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllLodgingAsync.pending, (state) => {
        state.all.loading = true;
      })
      .addCase(getAllLodgingAsync.fulfilled, (state, action) => {
        state.all.loading = false;
        state.all = action.payload;
        localStorage.setItem('lodging', JSON.stringify(state));
      })
      .addCase(getAllLodgingAsync.rejected, (state, action) => {
        state.all.loading = false;
        state.all.error = action.payload;
      });

    builder
      .addCase(getByIdLodgingAsync.pending, (state) => {
        state.current.loading = true;
      })
      .addCase(getByIdLodgingAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('lodging', JSON.stringify(state));
      })
      .addCase(getByIdLodgingAsync.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = action.payload;
      });

    builder
      .addCase(getWhereLodgingAsync.pending, (state) => {
        state.where.loading = true;
      })
      .addCase(getWhereLodgingAsync.fulfilled, (state, action) => {
        state.where = action.payload;
        state.where.loading = false;
        localStorage.setItem('lodging', JSON.stringify(state));
      })
      .addCase(getWhereLodgingAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });
  },
});

export const selectAllLodging = (state) => state.lodging.all;
export const selectWhereLodging = (state) => state.lodging.where;
export const selectCurrentLodging = (state) => state.lodging.current;

export const { cheanLodging } = lodgingSlice.actions;

export default lodgingSlice.reducer;
