// src/store/employeeSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../models/Employee';
import transformedMockData from '../data/employeeData';

interface EmployeeState {
  employeeList: Employee[];
}

const initialState: EmployeeState = {
    employeeList: transformedMockData,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
        console.log("Reducer received payload:", action.payload);
      state.employeeList.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
