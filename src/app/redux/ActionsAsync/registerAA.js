import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getRegisterFetch = async (registerId) => {
  try {
    //
    let res;

    registerId ? (res = await fetch(ENPOINT.register_getAll + registerId)) : (res = await fetch(ENPOINT.register_getAll));
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error geuRegisterFetch', error: error.toString() });
    return { error };
  }
};

const getWhereRegisterFetch = async (where = {}) => {
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

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getWhereRegisterFetch', error: error.toString() });
    return { error };
  }
};

export const getAllRegisterAsync = createAsyncThunk('register/getAll', async () => {
  try {
    //

    const result = await getRegisterFetch();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getByIdRegisterAsync = createAsyncThunk('register/getById', async (registerId) => {
  try {
    //

    const result = await getRegisterFetch(registerId);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getWhereGoestAsync = createAsyncThunk('register/getWhere', async (where) => {
  try {
    //

    const result = await getWhereRegisterFetch(where);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return { error: error.toString() };
  }
});
