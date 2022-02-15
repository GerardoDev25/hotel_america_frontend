import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllRoomFetch = async (page, roomId = false) => {
  try {
    //

    let res;
    if (roomId) fetch(ENPOINT.room_getAll + roomId);
    else {
      page > 1 ? (res = await fetch(`${ENPOINT.room_getAll}/?limit=10&offset=${page * 10 - 10}`)) : (res = await fetch(ENPOINT.room_getAll));
    }

    const result = await res.json();
    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllRoomFetch', error: error.toString() });
    return { error };
  }
};

const getWhereRoomFetch = async (where = {}) => {
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

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getWhereRoomFetch', error: error.toString() });
    return { error };
  }
};

export const getAllRoomAsync = createAsyncThunk('room/getAll', async (page = 1) => {
  try {
    //

    const result = await getAllRoomFetch(page);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getByIdRoomAsync = createAsyncThunk('room/getById', async (roomId) => {
  try {
    //

    const result = await getAllRoomFetch(roomId);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});

export const getWhereGoestAsync = createAsyncThunk('room/getWhere', async (where) => {
  try {
    //

    const result = await getWhereRoomFetch(where);
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return { error: error.toString() };
  }
});
