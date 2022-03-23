import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  action: '',
  placement: 'left',
  width: 600,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: initialState,
  reducers: {
    drawerClose: () => initialState,
    drawerOpen: (state, action) => {
      return { ...state, ...action.payload, visible: true };
    },
  },
});

export const selectDrawer = (state) => state.drawer;

export const { drawerClose, drawerOpen } = drawerSlice.actions;

export default drawerSlice.reducer;
