import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllStaffFetch = async (staffId) => {
  try {
    //

    let res;
    staffId ? (res = await fetch(ENPOINT.staff_getAll + staffId)) : (res = await fetch(ENPOINT.staff_getAll));
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllStaffFetch', error: error.toString() });
    return { error };
  }
};

const getWhereStaffFetch = async (where = {}) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.staff_getWhere, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getWhereStaffFetch', error: error.toString() });
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

export const getByIdStaffAsync = createAsyncThunk('staff/getById', async (staffId) => {
  try {
    //

    const result = await getAllStaffFetch(staffId);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getWhereStaffAsync = createAsyncThunk('staff/getWhere', async (where) => {
  try {
    //

    const result = await getWhereStaffFetch(where);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});
