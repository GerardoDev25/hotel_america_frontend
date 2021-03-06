import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT, MESSAGE } from '../../helpers/settings';

export const getAllLodgingAsync = createAsyncThunk('lodging/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.lodging + param);
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

export const getByIdlodgingAsync = createAsyncThunk('lodging/getById', async (lodgingId) => {
  try {
    //

    if (!lodgingId) throw new Error('id is required');

    const res = await fetch(ENPOINT.lodging + lodgingId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdLodgingAsync lodging/getById', error: error.toString() });
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

export const createLodgingAsync = createAsyncThunk('lodging/create', async (fiels, { getState }) => {
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

    const res = await fetch(ENPOINT.lodging, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error createLodgingAsync lodging/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
export const updateLodgingAsync = createAsyncThunk('lodging/update', async ({ lodgingId, ...rest }, { getState }) => {
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

    const res = await fetch(ENPOINT.lodging + lodgingId, params);
    const result = await res.json();

    if (result.error) throw new Error(MESSAGE.errorDB);

    return { ...result, called: true };

    //
  } catch (error) {
    console.log({ step: 'error updatelodgingAsync lodging/update', error: error.toString() });
    return { ok: false, error: error.toString(), called: true, msg: MESSAGE.errorDB };
  }
});

export const deleteLodgingAsync = createAsyncThunk('lodging/delete', async (lodgingId, { getState }) => {
  //

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.lodging + lodgingId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error deletelodgingAsync lodging/delete', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
