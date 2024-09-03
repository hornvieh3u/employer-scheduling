import * as api from './api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  // ** files upload reducers
  filesUploadBannerStart,
  filesUploadBannerSuccess,
  filesUploadBannerError,
  filesUploadBannerReset
} from './reducer';
import { getEventInfo } from '.';

// ** files upload Action
export const uploadBannerFilesAction = (form) => async (dispatch) => {
  try {
    dispatch(filesUploadBannerStart());
    await api.uploadBannerFileRequest(form);
    dispatch(filesUploadBannerSuccess());
  } catch (error) {
    dispatch(filesUploadBannerError(error));
  }
};


export const submitReplyAction = (state) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.submitReply(state);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?.id }));
  } catch (error) {
    // console.log(error?.response?.data?.errors)
    // dispatch(EmployeeListError(data))
  }
  // Reset After 3 sec
};

export const deleteGuestAction = ({ eventId, guestId }) => async (dispatch) => {
  try {
    await api.deleteGuest({ eventId, guestId });
    dispatch(getEventInfo(eventId));
  } catch (error) {
  }
}

