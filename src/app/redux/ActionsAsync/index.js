import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginFetch } from '../../helpers/fetch';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const loginAsync = createAsyncThunk('auth/login', async (fields) => {
  try {
    const result = await loginFetch(fields);
    const { token, ok, msg } = result;
    const data = parseJwt(token);

    return { ...data, ok, msg };
  } catch (e) {}
});
