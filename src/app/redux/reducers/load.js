import { createSlice } from '@reduxjs/toolkit';

const init = {
  visible: false,
};

const LoadSlice = createSlice({
  name: 'load',
  initialState: init,
  reducers: {
    loadOn(state) {
      state.visible = true;
    },
    loadOff(state) {
      state.visible = false;
    },
  },
});

export const selectLoad = (state) => state.load;

export const { loadOn, loadOff } = LoadSlice.actions;

export default LoadSlice.reducer;
