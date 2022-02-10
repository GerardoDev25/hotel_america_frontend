const ENDPOINT_BASE = 'http://localhost:3001/api';

export const roles = { role_admin: 'Admin', role_laundry: 'Laundry', role_reception: 'Reception', role_Cafeteria: 'Cafeteria' };


export const ENPOINT = {
  auth_login: `${ENDPOINT_BASE}/auth/login`,
  room_getAll: `${ENDPOINT_BASE}/room/`,
  amount_getAll: `${ENDPOINT_BASE}/amount/`,
  goest_getAll: `${ENDPOINT_BASE}/goest/`,
  register_getAll: `${ENDPOINT_BASE}/register/`,
  staff_getAll: `${ENDPOINT_BASE}/staff/`,
};
