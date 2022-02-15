import { configureStore } from '@reduxjs/toolkit';

import auth from './reducers/auth';
import room from './reducers/room';
import staff from './reducers/staff';
import goest from './reducers/goest';
import amount from './reducers/amount';
import register from './reducers/register';

import navbar from './reducers/navbar';

const store = configureStore({
  reducer: { auth, room, amount, goest, register, staff, navbar },
});
export default store;
