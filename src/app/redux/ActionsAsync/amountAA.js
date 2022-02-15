import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllAmountFetch = async (amountId) => {
  try {
    //

    let res;

    amountId ? (res = await fetch(ENPOINT.amount_getAll + amountId)) : await fetch(ENPOINT.amount_getAll);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllAmountFetch', error: error.toString() });
    return { error };
  }
};

const getWhereAmountFetch = async (where = {}) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.amount_getWhere, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getWhereAmountFetch', error: error.toString() });
    return { error };
  }
};

export const getAllAmountAsync = createAsyncThunk('amount/getAll', async () => {
  try {
    //

    const result = await getAllAmountFetch();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getByIdRegisterAsync = createAsyncThunk('amount/getById', async (amountId) => {
  try {
    //

    const result = await getAllAmountFetch(amountId);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getWhereGoestAsync = createAsyncThunk('goest/getWhere', async (where) => {
  try {
    //

    const result = await getWhereAmountFetch(where);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return { error: error.toString() };
  }
});
