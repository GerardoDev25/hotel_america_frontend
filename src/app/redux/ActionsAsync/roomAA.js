import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllRoomAsync = createAsyncThunk('room/getAll', async (page = 1) => {
  try {
    //

    let param = ``;

    if (page === 1) param = ``;
    else if (page === 0) param = `?limit=0&offset=0`;
    else param = `?limit=10&offset=${page * 10 - 10}`;

    const res = await fetch(ENPOINT.room + param);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getAllRoomAsync room/getAll', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getByIdRoomAsync = createAsyncThunk('room/getById', async (roomId) => {
  try {
    //
    if (!roomId) throw new Error('id is required');

    const res = await fetch(ENPOINT.room + roomId);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getByIdRegisterAsync room/getById', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const getWhereRoomAsync = createAsyncThunk('room/getWhere', async (where = {}) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify(where),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.room_getWhere, params);
    const result = await res.json();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    console.log({ step: 'error getWhereRoomAsync room/getWhere', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const createRoomAsync = createAsyncThunk('room/create', async (fiels, { getState }) => {
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

    const res = await fetch(ENPOINT.room, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error createRoomAsync room/create', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const updateRoomAsync = createAsyncThunk('room/update', async ({ roomId, ...rest }, { getState }) => {
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

    const res = await fetch(ENPOINT.room + roomId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error updateRoomAsync room/update', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});

export const deleteRoomAsync = createAsyncThunk('room/delete', async (roomId, { getState }) => {
  //

  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: getState().auth.token,
      },
    };

    const res = await fetch(ENPOINT.room + roomId, params);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error deleteRoomAsync room/delete', error: error.toString() });
    return { ok: false, error: error.toString() };
  }
});
