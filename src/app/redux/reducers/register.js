import { createSlice } from '@reduxjs/toolkit';
import { getAllRegisterAsync, getByIdRegisterAsync } from '../ActionsAsync/registerAA';

const init = {
  loading: false,
  registers: null,
  currentItem: {
    data: null,
    msg: '',
    ok: false,
    loading: false,
  },
  ok: false,
  msg: '',
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
        state.loading = true;
      })
      .addCase(getAllRegisterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.msg = action.payload.msg;
        state.total = action.payload.data.total;
        state.registers = action.payload.data.rows;
        state.pageCount = action.payload.data.pageCount;
      })
      .addCase(getAllRegisterAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getByIdRegisterAsync.pending, (state) => {
        state.currentItem.loading = false;
      })
      .addCase(getByIdRegisterAsync.fulfilled, (state, action) => {
        state.currentItem.loading = true;
        state.currentItem.ok = action.payload.ok;
        state.currentItem.msg = action.payload.msg;
        state.currentItem.data = action.payload.data[0];
      });
  },
});

export const selectRegister = (state) => state.register;

export const { cheanRegister } = registerSlice.actions;

export default registerSlice.reducer;
