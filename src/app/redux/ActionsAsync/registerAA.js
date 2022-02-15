import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllRegisterAsync = createAsyncThunk('register/getAll', async (page = 1) => {
  try {
    //

    let res;
    page > 1 ? (res = await fetch(`${ENPOINT.register_getAll}/?limit=10&offset=${page * 10 - 10}`)) : (res = await fetch(ENPOINT.register_getAll));
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllRegisterAsync register/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdRegisterAsync = createAsyncThunk('register/getById', async (registerId) => {
  try {
    //

    if (!registerId) throw new Error('id is required');

    const res = await fetch(ENPOINT.register_getAll + registerId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdRegisterAsync register/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereGoestAsync = createAsyncThunk('register/getWhere', async (where = {}) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.register_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereGoestAsync register/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
