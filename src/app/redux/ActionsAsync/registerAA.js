import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllRegisterFetch = async (registerId) => {
  try {
    //

    let res;

    registerId ? (res = await fetch(ENPOINT.register_getAll + registerId)) : (res = await fetch(ENPOINT.register_getAll));
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllRegisterFetch', error: error.toString() });
    return { error };
  }
};

export const getAllRegisterAsync = createAsyncThunk('register/getAll', async () => {
  try {
    //

    const result = await getAllRegisterFetch();
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

    const result = await getAllRegisterFetch(registerId);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});
