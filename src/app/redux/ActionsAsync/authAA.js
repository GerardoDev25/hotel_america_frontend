import { message } from 'antd';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { capitalizeWorlds } from '../../helpers';
import { ENPOINT } from '../../helpers/settings';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

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
    return result;
  } catch (error) {
    console.log({ step: 'error loginFetch', error: error.toString() });
    return { error };
  }
};

export const loginAsync = createAsyncThunk('auth/login', async (fields) => {
  try {
    const result = await loginFetch(fields);

    const { token, ok, msg, error } = result;

    if (ok) {
      message.success({
        content: capitalizeWorlds(result.msg),
        className: 'custom-class',
        style: {
          marginTop: '5vh',
          marginLeft: '80%',
        },
      });
    } else message.error(capitalizeWorlds(msg));

    if (error) throw new Error(error);

    // return { ok: false, msg: 'Mensaje ', error: 'error', called: true };

    const data = parseJwt(token);
    return { data, ok, msg, token };

    //
  } catch (error) {
    return { msg: error.toString(), ok: false, called: true };
  }
});
