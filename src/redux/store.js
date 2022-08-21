import { configureStore } from '@reduxjs/toolkit';
import reducer from './employees/employeesSlice';

export const store = configureStore({
  reducer
});
