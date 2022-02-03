import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENPOINT } from '../../helpers/settings';

const getAllRoomFetch = async () => {
  try {
    //

    const res = await fetch(ENPOINT.room_getAll);
    const result = await res.json();

    return result;

    //
  } catch (error) {
    console.log({ step: 'error getAllRoomFetch', error: error.toString() });
    return { error };
  }
};

export const getAllRoomAsync = createAsyncThunk('room/getAll', async () => {
  try {
    //

    const result = await getAllRoomFetch();
    const { data, ok, msg, error } = result;

    if (error) throw new Error(error);
    return { data, ok, msg };

    //
  } catch (error) {
    return error.toString();
  }
});
