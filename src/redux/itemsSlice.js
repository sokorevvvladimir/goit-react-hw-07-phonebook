import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    removeItem(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const itemsReducer = itemsSlice.reducer;

export const { addItem, removeItem } = itemsSlice.actions;
