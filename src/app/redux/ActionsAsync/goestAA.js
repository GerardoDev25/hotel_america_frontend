import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllGoestFetch = async () => {
  try {
    //

    const res = await fetch(ENPOINT.goest_getAll);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllGoestFetch', error: error.toString() });
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
    return error.toString();
  }
});
