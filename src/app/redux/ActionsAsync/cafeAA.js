import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENPOINT } from '../../helpers/settings';

export const getAllCafeAsync = createAsyncThunk('cafe/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.cafe + param);
    const result = await res.json();

    const { data, ok, msg, error } = result;
    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllCafeAsync cafe/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereCafeAsync = createAsyncThunk('cafe/getWhere', async (where = {}) => {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.cafe_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereCafeAsync cafe/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const createCafeAsync = createAsyncThunk('cafe/create', async (_, { getState }) => {
  try {
    //

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.cafe, params);
    const result = await res.json();
    const { error } = result;

    if (error) throw new Error(error);
    return { ...result };

    //
  } catch (error) {
    console.log({ step: 'error createCafeAsync cafe/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const updateCafeAsync = createAsyncThunk('cafe/update', async ({ cafeId, ...rest }, { getState }) => {
  //

  try {
    const params = {
      method: 'PUT',
      body: JSON.stringify({ ...rest }),
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.cafe + cafeId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error updateCafeAsync cafe/update', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});