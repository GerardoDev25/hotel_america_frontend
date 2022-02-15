import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllGoestFetch = async (goestId = false) => {
  try {
    //

    let res;
    goestId ? (res = await fetch(ENPOINT.goest_getAll + goestId)) : (res = await fetch(ENPOINT.goest_getAll));
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestFetch', error: error.toString() });
    return { error };
  }
};

const getWhereGoestFetch = async (where = {}) => {
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

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getWhereGoestFetch', error: error.toString() });
    return { error };
  }
};

export const getAllGoestAsync = createAsyncThunk('goest/getAll', async () => {
  try {
    //

    const result = await getAllGoestFetch();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return { error: error.toString() };
  }
});

export const getByIdGoestAsync = createAsyncThunk('goest/getById', async (registerId) => {
  try {
    //

    const result = await getAllGoestFetch(registerId);
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

    const result = await getWhereGoestFetch(where);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return { error: error.toString() };
  }
});
