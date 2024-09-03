import { createSlice } from '@reduxjs/toolkit';

export const eventContact = createSlice({
  name: 'eventContact',
  initialState: {
    // Add new Client Contact
    isEventContactLoading: false,
    isEventContactErrors: false,
    eventContact: {
      uploadSuccess: false
    },

    // ** Banner File upload Initial state
    filesUploadBanner: {
      isLoading: false,
      isSuccess: false,
      error: null
    }
  },
  reducers: {
    // Banner File Upload
    filesUploadBannerStart: (state, action) => {
      state.filesUploadBanner.isLoading = true;
      state.filesUploadBanner.isSuccess = false;
      state.filesUploadBanner.error = null;
    },
    filesUploadBannerSuccess: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = true;
      state.filesUpload.error = null;
    },
    filesUploadBannerError: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = false;
      state.filesUpload.error = action.payload;
    },
    filesUploadBannerReset: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = false;
      state.filesUpload.error = null;
    }
  }
});

//
// updateBillingInfo

export const {
  // ** files upload
  filesUploadBannerStart,
  filesUploadBannerSuccess,
  filesUploadBannerError,
  filesUploadBannerReset
} = eventContact.actions;

export default eventContact.reducer;
