import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllStaffAsync = createAsyncThunk('staff/getAll', async (page = 1) => {
  try {
    //

    let res;
    page > 1 ? (res = await fetch(`${ENPOINT.staff_getAll}/?limit=10&offset=${page * 10 - 10}`)) : (res = await fetch(ENPOINT.staff_getAll));
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllStaffAsync staff/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdStaffAsync = createAsyncThunk('staff/getById', async (staffId) => {
  try {
    //

    if (!staffId) throw new Error('id is required');

    const res = await fetch(ENPOINT.staff_getAll + staffId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdStaffAsync staff/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereStaffAsync = createAsyncThunk('staff/getWhere', async (where = {}) => {
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
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereStaffAsync staff/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
