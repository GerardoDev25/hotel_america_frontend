import { createSlice } from '@reduxjs/toolkit';

const init = {
  panel: false,
};

const NavbarSlice = createSlice({
  name: 'navbar',
  initialState: init,
  reducers: {
    openPanel(state) {
      state.panel = true;
    },
    clesedPanel(state) {
      state.panel = false;
    },
  },
});

export const selectNavbar = (state) => state.navbar;

export const { openPanel, clesedPanel } = NavbarSlice.actions;
// export const { openPanel } = NavbarSlice.actions;

export default NavbarSlice.reducer;
