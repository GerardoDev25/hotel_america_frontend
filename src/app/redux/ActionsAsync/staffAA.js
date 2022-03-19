import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllStaffAsync = createAsyncThunk('staff/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.staff + param);
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

    const res = await fetch(ENPOINT.staff + staffId);
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



export const createStaffAsync = createAsyncThunk('staff/create', async (fiels, { getState }) => {
  //

  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(fiels),
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.staff, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error createStaffAsync staff/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
export const updateStaffAsync = createAsyncThunk('staff/update', async ({ staffId, ...rest }, { getState }) => {
  //

  try {
    const params = {
      method: 'PUT',
      body: JSON.stringify({ ...rest }),
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.staff + staffId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error updateStaffAsync staff/update', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const deleteStaffAsync = createAsyncThunk('staff/delete', async (staffId, { getState }) => {
  //

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.staff + staffId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error deleteStaffAsync staff/delete', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
