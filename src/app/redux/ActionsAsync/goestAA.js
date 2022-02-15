import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllGoestAsync = createAsyncThunk('goest/getAll', async (page = 1) => {
  try {
    //

    let res;
    page > 1 ? (res = await fetch(`${ENPOINT.goest_getAll}/?limit=10&offset=${page * 10 - 10}`)) : (res = await fetch(ENPOINT.goest_getAll));
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

    const res = await fetch(ENPOINT.goest_getAll + goestId);
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
