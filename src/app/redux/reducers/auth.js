import { createSlice } from '@reduxjs/toolkit';
import { loginAsync } from '../ActionsAsync';

const init = {
  loading: false,
  login: false,
  error: null,
  staff: {},
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
        localStorage.setItem('auth', JSON.stringify(state));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
