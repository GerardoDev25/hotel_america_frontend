import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllRoomFetch = async (page) => {
  try {
    //

    let res;
    //  offset
    page > 1 ? (res = await fetch(ENPOINT.room_getAll)) : (res = await fetch(`${ENPOINT.room_getAll}/?limit=10&offset=${page * 10 - 10}`));

    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllRoomFetch', error: error.toString() });
    return { error };
  }
};

export const getAllRoomAsync = createAsyncThunk('room/getAll', async (page = 1) => {
  try {
    //

    const result = await getAllRoomFetch(page);
    const { data, ok, msg, error } = result;

    console.log(data);
    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});
