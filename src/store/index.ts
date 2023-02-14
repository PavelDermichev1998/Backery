import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice/loginSlice';
import registerSlice from './registerSlice/registerSlice';
import jobRequestSlice from './jobRequestSlice/jobRequestSlice';
import profileSlice from './profileSlice/profileSlice';
import employeesSlice from './employeesSlice/employeesSlice';
import employeeDashboardSlice from './employeeDashboardSlice/employeeDashboardSlice';
import candidatesDataRequestSlice from './adminDashboardSlice/adminDashboardSlice';

const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    jobRequest: jobRequestSlice,
    profile: profileSlice,
    employees: employeesSlice,
    logs: employeeDashboardSlice,
    candidates: candidatesDataRequestSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
