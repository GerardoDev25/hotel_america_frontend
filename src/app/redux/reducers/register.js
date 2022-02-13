import { createSlice } from '@reduxjs/toolkit';
import { getAllRegisterAsync, getByIdRegisterAsync } from '../ActionsAsync/registerAA';

const init = {
  loading: false,
  registers: null,
  error: null,
  ok: false,
  msg: '',
  current: {
    loading: false,
    register: null,
    error: null,
    ok: false,
    msg: '',
  },
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
      .addCase(getByIdRegisterAsync.pending, (state, action) => {
        state.current.loading = false;
      })
      .addCase(getByIdRegisterAsync.fulfilled, (state, action) => {
        state.current.loading = true;
        console.log(action.payload);
      });
  },
});

export const selectRegister = (state) => state.register;

export const { cheanRegister } = registerSlice.actions;

export default registerSlice.reducer;
