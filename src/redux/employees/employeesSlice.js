import { createSlice } from '@reduxjs/toolkit';
import { calcIRRFValue } from '../../utils';


const initialState = {
  employees: [],
  editEmployee: -1,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addingEmployee: (state, action) => {
      const discountIRRF = calcIRRFValue(action.payload);
      state.employees.push({ 
        ...action.payload, discountIRRF, 
        id: state.employees.length >  0 
          ? state.employees.at(-1).id + 1 
          : 0
      });
    },
    editEmployee: (state, action) => {
      state.editEmployee =  action.payload;
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(({ id })=> id !== action.payload );
    },
    saveEditEmployee: (state, action) => {
      const discountIRRF = calcIRRFValue(action.payload);
      state.employees = state.employees.map((employee) => employee.id === action.payload.id 
        ? {...action.payload, discountIRRF } 
        : employee
      );
      state.editEmployee = -1;
    }
  },
});

export const { addingEmployee, editEmployee, deleteEmployee, saveEditEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;

