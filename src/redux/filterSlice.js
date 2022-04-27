import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
    },
    clearFilter(state) {
      return (state = initialState);
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { changeFilter, clearFilter } = filterSlice.actions;
