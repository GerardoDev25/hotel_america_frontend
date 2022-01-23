import { message } from 'antd';
import { capitalizeWorlds } from '.';

import { ENPOINT } from './settings';

export const loginFetch = async (fields) => {
  try {
    const res = await fetch(ENPOINT.auth_login, {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();
    if (result.ok) {
      message.success({
        content: capitalizeWorlds(result.msg),
        className: 'custom-class',
        style: {
          marginTop: '5vh',
          marginLeft: '80%',
        },
      });
      return result;
    } else message.error(capitalizeWorlds(result.msg));
  } catch (error) {}
};
