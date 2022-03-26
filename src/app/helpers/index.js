import { logout } from '../redux/reducers/auth';
import { cheanCafe } from '../redux/reducers/cafe';
import { cheanRoom } from '../redux/reducers/room';
import { cheanStaff } from '../redux/reducers/staff';
import { cheanGoest } from '../redux/reducers/goest';
import { drawerClose } from '../redux/reducers/drawer';
import { cheanAmount } from '../redux/reducers/amount';
import { cheanLodging } from '../redux/reducers/lodging';
import { cheanRegister } from '../redux/reducers/register';

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const capitalizeWorlds = (str) => {
  if (!str) return;

  const exclude = ['the', 'or', 'in', 'of', 'is', 'on', 'at', "isn't", "don't"];

  const arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    if (!exclude.includes(arr[i])) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const getLetersInitials = (str) => {
  if (!str) return;
  const init = str.split(' ');
  let leters = '';
  init.forEach((e) => {
    leters += e[0].toUpperCase();
  });
  return leters;
};

export const cleanLocalStorage = (dispatch, navigate, message) => {
  dispatch(logout());
  dispatch(cheanCafe());
  dispatch(cheanRoom());
  dispatch(cheanGoest());
  dispatch(cheanStaff());
  dispatch(drawerClose());
  dispatch(cheanAmount());
  dispatch(cheanLodging());
  dispatch(cheanRegister());
  localStorage.clear();
  navigate('/login', { replace: true });
  message.info('logged');
};

export const calculateWidth = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (width > 750) return 750;
  else if (width <= 750 && width >= 390) return width;
  else return 390;
};
