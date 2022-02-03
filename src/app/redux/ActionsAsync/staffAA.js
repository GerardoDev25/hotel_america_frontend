import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllStaffFetch = async () => {
  try {
    //

    const res = await fetch(ENPOINT.staff_getAll);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllStaffFetch', error: error.toString() });
    return { error };
  }
};

export const getAllStaffAsync = createAsyncThunk('staff/getAll', async () => {
  try {
    //

    const result = await getAllStaffFetch();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});
