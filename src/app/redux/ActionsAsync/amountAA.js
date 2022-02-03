import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllAmountFetch = async () => {
  try {
    //

    const res = await fetch(ENPOINT.amount_getAll);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllAmountFetch', error: error.toString() });
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
