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
    return result;
  } catch (error) {}
};
