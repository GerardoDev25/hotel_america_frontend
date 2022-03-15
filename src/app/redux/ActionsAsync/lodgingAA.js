import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllLodgingAsync = createAsyncThunk('lodging/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.lodging_get + param);
    const result = await res.json();

    const { data, ok, msg, error } = result;
    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllLodgingAsync lodging/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdLodgingAsync = createAsyncThunk('lodging/getById', async (lodgingId) => {
  try {
    //

    if (!lodgingId) throw new Error('id is required');

    const res = await fetch(ENPOINT.lodging_get + lodgingId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdlodgingAsync lodging/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereLodgingAsync = createAsyncThunk('lodging/getWhere', async (where = {}) => {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.lodging_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereLodgingAsync lodging/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
