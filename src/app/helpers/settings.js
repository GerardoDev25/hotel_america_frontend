const ENDPOINT_BASE = 'http://localhost:3001/api';

export const roles = { role_admin: 'Admin', role_laundry: 'Laundry', role_reception: 'Reception', role_Cafeteria: 'Cafeteria' };

export const ENPOINT = {
  auth_login: `${ENDPOINT_BASE}/auth/login`,

  goest_getAll: `${ENDPOINT_BASE}/goest/`,
  goest_getWhere: `${ENDPOINT_BASE}/goest/where`,

  room_getAll: `${ENDPOINT_BASE}/room/`,
  room_getWhere: `${ENDPOINT_BASE}/room/where`,

  amount_getAll: `${ENDPOINT_BASE}/amount/`,
  amount_getWhere: `${ENDPOINT_BASE}/amount/where`,

  register_getAll: `${ENDPOINT_BASE}/register/`,
  register_getWhere: `${ENDPOINT_BASE}/register/where`,

  staff_getAll: `${ENDPOINT_BASE}/staff/`,
  staff_getWhere: `${ENDPOINT_BASE}/staff/where`,
};
