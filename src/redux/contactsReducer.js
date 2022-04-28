import { itemsReducer } from './itemsSlice';
import { filterReducer } from './filterSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
