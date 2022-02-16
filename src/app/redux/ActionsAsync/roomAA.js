import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

export const getAllRoomAsync = createAsyncThunk('room/getAll', async (page = 1) => {
  try {
    //

    let res;
    page > 1 ? (res = await fetch(`${ENPOINT.room_getAll}/?limit=10&offset=${page * 10 - 10}`)) : (res = await fetch(ENPOINT.room_getAll));

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

    const res = await fetch(ENPOINT.room_getAll + roomId);
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
