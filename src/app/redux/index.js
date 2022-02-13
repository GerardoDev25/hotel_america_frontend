import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import room from './reducers/room';
import amount from './reducers/amount';
import goest from './reducers/goest';
import register from './reducers/register';
import staff from './reducers/staff';

import navbar from './reducers/navbar';

const store = configureStore({
  reducer: { auth, room, amount, goest, register, staff, navbar },
});
export default store;
