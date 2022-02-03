import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import roomReducer from './reducers/room';
const store = configureStore({
  reducer: { auth: authReducer, room: roomReducer },
});
export default store;
