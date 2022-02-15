import { createSlice } from '@reduxjs/toolkit';
import { getAllRegisterAsync, getByIdRegisterAsync, getWhereGoestAsync } from '../ActionsAsync/registerAA';

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

const registerSlice = createSlice({
  name: 'register',
  initialState: JSON.parse(localStorage.getItem('register')) || init,
  reducers: {
    cheanRegister() {
      localStorage.removeItem('register');
      return init;
    },
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
        state.current.loading = true;
      })
      .addCase(getByIdRegisterAsync.fulfilled, (state, action) => {
        state.current.loading = false;
        state.current = action.payload;
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getByIdRegisterAsync.rejected, (state, action) => {
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
        localStorage.setItem('register', JSON.stringify(state));
      })
      .addCase(getWhereGoestAsync.rejected, (state, action) => {
        state.where.loading = false;
        state.where.error = action.payload;
      });
  },
});

export const selectAllRegister = (state) => state.register.all;
export const selectWhereRegister = (state) => state.register.where;
export const selectCurrentRegister = (state) => state.register.current;

export const { cheanRegister } = registerSlice.actions;

export default registerSlice.reducer;
