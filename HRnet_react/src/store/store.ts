// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['employees/addEmployee'], // Ignore serialization checks for specific actions
        ignoredPaths: ['employees.employeeList.dateOfBirth', 'employees.employeeList.startDate'], // Ignore specific paths
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
