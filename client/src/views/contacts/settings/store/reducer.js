import { createSlice } from '@reduxjs/toolkit';

export const scheduleSetting = createSlice({
  name: 'scheduleSetting',
  initialState: {
    groups: {
      data: [],
      total: 0
    },
    positions: {
      data: [],
      total: 0
    },
    shifts: {
      data: [],
      total: 0
    },
    modified: {
      success: false,
      message: '',
      done: false
    },
    schedules: {
      shiftsInSchedule: [],
      employeesInSchedule: []
    }
  },
  reducers: {
    getGroupSuccess: (state, action) => {
      state.groups.data = action.payload.groups;
      state.groups.total = action.payload.total;
    },
    getPositionSuccess: (state, action) => {
      state.positions.data = action.payload;
      state.positions.total = action.payload.length;
    },
    getShiftSuccess: (state, action) => {
      state.shifts.data = action.payload.shifts;
      state.shifts.total = action.payload.total;
    },
    getSchedulesSuccess: (state, action) => {
      state.schedules.shiftsInSchedule = action.payload.shiftsInSchedule;
      state.schedules.employeesInSchedule = action.payload.employeesInSchedule;
    },
    modifiedSuccess: (state, action) => {
      state.modified.success = action.payload.success;
      state.modified.message = action.payload.message;
      state.modified.done = true;
    },
    initModifiedSuccess: (state, action) => {
      state.modified.success = false;
      state.modified.message = '';
      state.modified.done = false;
    }
  }
});

export const {
  getGroupSuccess,
  getPositionSuccess,
  getShiftSuccess,
  getSchedulesSuccess,
  modifiedSuccess,
  initModifiedSuccess
} = scheduleSetting.actions;

export default scheduleSetting.reducer;
