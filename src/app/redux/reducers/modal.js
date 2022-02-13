import { createSlice } from '@reduxjs/toolkit';

const init = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState: init,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    clesedModal(state) {
      state.isOpen = false;
    },
  },
});

export const selectModal = (state) => state.modal;

export const { openModal, clesedModal } = ModalSlice.actions;

export default ModalSlice.reducer;
