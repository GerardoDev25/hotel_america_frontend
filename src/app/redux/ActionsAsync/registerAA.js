import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllRegisterFetch = async () => {
  try {
    //

    const res = await fetch(ENPOINT.register_getAll);
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
