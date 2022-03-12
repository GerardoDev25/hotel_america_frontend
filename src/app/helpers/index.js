import { logout } from '../redux/reducers/auth';
import { cheanCafe } from '../redux/reducers/cafe';
import { cheanRoom } from '../redux/reducers/room';
import { cheanStaff } from '../redux/reducers/staff';
import { cheanGoest } from '../redux/reducers/goest';
import { cheanAmount } from '../redux/reducers/amount';
import { cheanRegister } from '../redux/reducers/register';

export const capitalizeWorlds = (str) => {
  if (!str) return;

  const exclude = ['the', 'or', 'in', 'of'];

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
  dispatch(cheanAmount());
  dispatch(cheanRegister());
  navigate('/login', { replace: true });
  message.info('logged');
};
