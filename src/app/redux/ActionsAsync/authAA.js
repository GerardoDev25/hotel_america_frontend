import { message } from 'antd';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { capitalizeWorlds, parseJwt } from '../../helpers';
import { ENPOINT, MESSAGE } from '../../helpers/settings';

const loginFetch = async (fields) => {
  try {
    const res = await fetch(ENPOINT.auth_login, {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();
    return { ...result, called: true };
  } catch (error) {
    console.log({ step: 'error loginFetch', error: error.toString() });
    return { error: true, ok: false, msg: MESSAGE.errorDB, called: true };
  }
};

export const loginAsync = createAsyncThunk('auth/login', async (fields) => {
  try {
    //

    const result = await loginFetch(fields);
    const { token, ok, msg, error, called } = result;
    if (error) throw new Error(error);

    ok
      ? message.success({
          content: capitalizeWorlds(result.msg),
          className: 'custom-class',
          style: {
            marginTop: '5vh',
            marginLeft: '80%',
          },
        })
      : message.error(capitalizeWorlds(msg));

    const data = parseJwt(token);

    return { data, ok, msg, token, called };

    //
  } catch (error) {
    console.log({ step: 'error loginAsync', error: error.toString() });
    return { error: true, ok: false, msg: MESSAGE.errorDB, called: true };
  }
});

export const renewAsync = createAsyncThunk('auth/renew', async (_, { getState }) => {
  try {
    //

    const params = {
      method: 'POST',
      body: JSON.stringify({ token: getState().auth.token }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(ENPOINT.auth_renew, params);
    const result = await res.json();

    const { token, ok, msg, error } = result;
    if (error) throw new Error(error);

    const data = parseJwt(token);
    return { data, ok, msg, token, called: true };

    //
  } catch (error) {
    console.log({ step: 'error renewAsync', error: error.toString() });
    return { error: true, ok: false, msg: MESSAGE.errorDB, called: true };
  }
});
