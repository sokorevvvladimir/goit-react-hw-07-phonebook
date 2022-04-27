import { itemsReducer } from './itemsSlice';
import { filterReducer } from './filterSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);
