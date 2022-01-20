import { createSlice } from '@reduxjs/toolkit';
import { loginAsync } from '../ActionsAsync';

const initialState = {
  loading: false,
  login: false,
  error: null,
  staff: {},
};

const testSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

// export const { } = testSlice.actions;

export default testSlice.reducer;
