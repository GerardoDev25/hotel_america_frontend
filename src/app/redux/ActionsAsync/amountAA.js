import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllAmountAsync = createAsyncThunk('amount/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.amount + param);
    const result = await res.json();

    const { data, ok, msg, error } = result;
    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllAmountAsync amount/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereAmountAsync = createAsyncThunk('amount/getWhere', async (where = {}) => {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.amount_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereAmountAsync amount/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdAmountAsync = createAsyncThunk('amount/getById', async (amountId) => {
  try {
    //

    if (!amountId) throw new Error('id is required');

    const res = await fetch(ENPOINT.amount + amountId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdAmountAsync amount/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const createAmountAsync = createAsyncThunk('amount/create', async (fiels, { getState }) => {
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

    const res = await fetch(ENPOINT.amount, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error createAmountAsync amount/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
export const updateAmountAsync = createAsyncThunk('amount/update', async ({ amountId, ...rest }, { getState }) => {
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

    const res = await fetch(ENPOINT.amount + amountId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error updateAmountAsync amount/update', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const deleteAmountAsync = createAsyncThunk('amount/delete', async (amountId, { getState }) => {
  //

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.amount + amountId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error deleteAmountAsync amount/delete', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
