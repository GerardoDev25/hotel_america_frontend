import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  login: false,
  error: null,
  staff: {},
};

const testLogin = async () => {
  return { data: { name: 'jonh doe', role: 'test' } };
};

export const loginAsync = createAsyncThunk('auth/login', async () => {
  try {
    const response = await testLogin();
    // console.log(response);
    return response.data;
  } catch (e) {}
});

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