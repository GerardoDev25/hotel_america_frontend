import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllAmountAsync = createAsyncThunk('amount/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.amount_get + param);
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

export const getByIdAmountAsync = createAsyncThunk('amount/getById', async (amountId) => {
  try {
    //

    if (!amountId) throw new Error('id is required');

    const res = await fetch(ENPOINT.amount_get + amountId);
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

    console.log(data);

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereAmountAsync amount/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
