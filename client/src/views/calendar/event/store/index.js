// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from '../../../../auth/utils';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventForm, { dispatch }) => {
    const response = await API.post(`event/create`, eventForm);
    await dispatch(getEvents(getUserData().id));
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ _id, eventForm }, { dispatch }) => {
    const response = await API.put(`event/update/${_id}`, eventForm);
    const result = await dispatch(getEvents(getUserData().id));

    return response.data;
  }
);

export const getEvents = createAsyncThunk('event/getEvents', async (userId) => {
  const response = await API.get(`event/all/${userId}`);
  return response.data;
});

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (eventId, { dispatch }) => {
  const response = await API.delete(`event/${eventId}`);
  if (response.status === 200) {
    await dispatch(getEvents(getUserData().id));
    return true;
  }
  return false;
});

export const getEventInfo = createAsyncThunk('event/getEventInfo', async (eventId) => {
  const response = await API.get(`event/info/${eventId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const getFileInfo = createAsyncThunk('event/getEventInfo', async (eventId) => {
  const response = await API.get(`event/info/${eventId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const addUpdateGuests = createAsyncThunk(
  'event/updateEvent',
  async ({ _id, guestData, isNewEmployee }, { dispatch }) => {
    const response = await API.put(`event/add-update-guest/${_id}`, { guestData, isNewEmployee });
    //const result = await dispatch(getEvents(getUserData().id));

    return response.data;
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    eventInfo: {},
    addGuests: [],
    isAddedSuccess: false,
    errors: {
      isError: false,
      data: {}
    }
  },
  reducers: {
    addNewGuests: (state, action) => {
      state.addGuests = action.payload;
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
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(getEventInfo.fulfilled, (state, action) => {
        state.eventInfo = action.payload;
      });
  }
});
export const { addNewGuests, addedSuccess, setErrors } = eventSlice.actions;

export default eventSlice.reducer;
