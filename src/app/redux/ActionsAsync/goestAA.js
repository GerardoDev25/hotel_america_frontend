import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllGoestAsync = createAsyncThunk('goest/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.goest + param);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestAsync goest/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdGoestAsync = createAsyncThunk('goest/getById', async (goestId) => {
  try {
    //

    if (!goestId) throw new Error('id is required');

    const res = await fetch(ENPOINT.goest + goestId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdGoestAsync goest/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereGoestAsync = createAsyncThunk('goest/getWhere', async (where = {}) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.goest_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereGoestFetch goest/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const createGoestAsync = createAsyncThunk('goest/create', async (fiels, { getState }) => {
  //

  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(fiels),
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.goest, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error createGoestAsync goest/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
export const updateGoestAsync = createAsyncThunk('goest/update', async ({ goestId, ...rest }, { getState }) => {
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

    const res = await fetch(ENPOINT.goest + goestId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error updateGoestAsync goest/update', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const deleteGoestAsync = createAsyncThunk('goest/delete', async (goestId, { getState }) => {
  //

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.goest + goestId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error deleteGoestAsync goest/delete', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
