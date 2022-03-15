import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, renewAsync } from '../ActionsAsync/authAA';

const init = {
  loading: false,
  login: false,
  staff: {},
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('auth')) || init,
  reducers: {
    logout() {
      localStorage.removeItem('auth');
      return init;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload.ok;
        state.staff = action.payload.data;
        state.token = action.payload.token;
        state.error = action.payload.error;
        state.called = action.payload.called;
        localStorage.setItem('auth', JSON.stringify(state));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(renewAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(renewAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload.ok;
        state.staff = action.payload.data;
        state.token = action.payload.token;
        state.error = action.payload.error;
        state.called = action.payload.called;
        localStorage.setItem('auth', JSON.stringify(state));
      })
      .addCase(renewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
