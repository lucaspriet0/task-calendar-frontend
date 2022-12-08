import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpenModal: (state) => {
      state.isDateModalOpen = true;
    },

    onCloseModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenModal, onCloseModal } = uiSlice.actions;
