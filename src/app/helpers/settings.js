export const roles = { role_admin: 'Admin', role_laundry: 'Laundry', role_reception: 'Reception', role_Cafe: 'Cafeteria' };

export const minZise = '390px';
export const midlleQuery = '600px';

const ENDPOINT_BASE = 'http://localhost:3001/api';

export const ENPOINT = {
  auth_login: `${ENDPOINT_BASE}/auth/login`,
  auth_renew: `${ENDPOINT_BASE}/auth/renew`,

  goest_get: `${ENDPOINT_BASE}/goest/`,
  goest_getWhere: `${ENDPOINT_BASE}/goest/where`,

  room_get: `${ENDPOINT_BASE}/room/`,
  room_getWhere: `${ENDPOINT_BASE}/room/where`,

  amount_get: `${ENDPOINT_BASE}/amount/`,
  amount_getWhere: `${ENDPOINT_BASE}/amount/where`,

  register_get: `${ENDPOINT_BASE}/register/`,
  register_getWhere: `${ENDPOINT_BASE}/register/where`,

  staff_get: `${ENDPOINT_BASE}/staff/`,
  staff_getWhere: `${ENDPOINT_BASE}/staff/where`,

  cafe_get: `${ENDPOINT_BASE}/cafe/`,
  cafe_getWhere: `${ENDPOINT_BASE}/cafe/where`,
  cafe_create: `${ENDPOINT_BASE}/cafe/`,
  cafe_update: `${ENDPOINT_BASE}/cafe/`,
};

export const MESSAGE = {
  errorDB: 'error connecting to server',
};
