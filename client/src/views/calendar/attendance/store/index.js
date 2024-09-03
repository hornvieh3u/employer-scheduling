// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from '../../../../auth/utils';
import { success, error } from '../../../ui-elements/response-popup';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const createClass = createAsyncThunk(
  'class/createClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post(`class/create`, classEvent);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const markAttendance = createAsyncThunk(
  'class/markAttendance',
  async (attendanceData, { dispatch }) => {
    try {
      const response = await API.post(`class/mark-attendance`, attendanceData);
      await dispatch(getClasses());
      await dispatch(getAttendance(attendanceData?.classId));
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const getAttendance = createAsyncThunk('class/getAttendance', async (classId) => {
  const response = await API.get(`class/get-attendance/${classId}`);
  return response?.data?.data;
});

export const getClasses = createAsyncThunk('class/getClasses', async () => {
  const response = await API.get(`class/all/${getUserData().id}`);
  return response?.data?.data;
});

export const updateClass = createAsyncThunk(
  'class/updateClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post('/class/update', classEvent);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const deleteClass = createAsyncThunk('class/deleteClass', async (classId, { dispatch }) => {
  try {
    const response = await API.delete(`class/${classId}`);

    if (response.status === 200) {
      await dispatch(getClasses(getUserData().id));
      success(response?.data?.msg);
      return true;
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors?.common?.msg) {
      error(errors.common.msg.replace(/\\/g, ''));
    } else {
      error(err.message.replace(/\\/g, ''));
    }
  }
});

export const deleteAttendance = createAsyncThunk('class/deleteAttendance', async (attendanceId) => {
  try {
    await API.delete(`/class/delete-attendance/${attendanceId}`);
    return true;
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors?.common?.msg) {
      error(errors.common.msg.replace(/\\/g, ''));
    } else {
      error(err.message.replace(/\\/g, ''));
    }
  }
});

export const getClassInfo = createAsyncThunk('class/getClassInfo', async (classId) => {
  const response = await API.get(`class/info/${classId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    classes: [],
    classAttendees: [],
    classInfo: {},
    selectedClass: {},
    isAddedSuccess: false,
    errors: {
      isError: false,
      data: {}
    }
  },
  reducers: {
    selectClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    addedSuccess: (state, action) => {
      state.isAddedSuccess = action.payload;
    },
    setErrors: (state, action) => {
      state.errors.isError = true;
      state.errors.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          action.payload.map((classEvent) => {
            classEvent.start = classEvent.startDate;
            classEvent.end = classEvent.endDate;
            classEvent.title = classEvent.classTitle;
          });
        }
        state.classes = action.payload;
      })
      .addCase(getClassInfo.fulfilled, (state, action) => {
        state.classInfo = action.payload;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.classAttendees = action.payload;
      });
  }
});
export const { addedSuccess, setErrors, selectClass } = attendanceSlice.actions;

export default attendanceSlice.reducer;
