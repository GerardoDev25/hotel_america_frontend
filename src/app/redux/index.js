import { configureStore } from '@reduxjs/toolkit';

import load from './reducers/load';
import navbar from './reducers/navbar';

import auth from './reducers/auth';
import room from './reducers/room';
import cafe from './reducers/cafe';
import staff from './reducers/staff';
import goest from './reducers/goest';
import amount from './reducers/amount';
import register from './reducers/register';

const store = configureStore({
  reducer: { load, navbar, auth, room, cafe, staff, goest, amount, register },
});
export default store;
