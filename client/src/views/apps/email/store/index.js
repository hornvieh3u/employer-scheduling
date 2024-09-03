// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { ENDPOINTS } from '../../../../lib/endpoints';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const getMails = createAsyncThunk('appEmail/getMails', async (params) => {
  let response;
  if (
    ['sent', 'trash', 'draft', 'spam', 'starred', 'scheduled', 'template'].includes(params.folder)
  ) {
    response = await API.get(ENDPOINTS.GET_ALL_EMAILS + '?folder=' + params.folder);
  } else {
    response = await axios.get('/apps/email/emails', { params });
  }
  return {
    params,
    data: response.data
  };
});

export const updateMails = createAsyncThunk(
  'appEmail/updateMails',
  async ({ emailIds, dataToUpdate, currentFolder, isTrash }, { dispatch, getState }) => {
    let response;
    if (dataToUpdate.folder == 'send-now') {
      response = await API.post(ENDPOINTS.SEND_SCHEDULED_EMAIL_NOW, {
        mailId: emailIds[0]
      });
    } else if (dataToUpdate.folder == 'trash') {
      response = await API.delete(ENDPOINTS.DELETE_EMAILS, {
        data: { emailIds, folder: currentFolder, isTrash }
      });
    } else if (dataToUpdate.folder == 'spam') {
      response = await API.post(ENDPOINTS.MARK_EMAILS_AS_SPAM, {
        emailIds
      });
    } else if (dataToUpdate.isStarred === true || dataToUpdate.isStarred === false) {
      response = await API.post(ENDPOINTS.STAR_EMAILS, {
        emailIds,
        isStarred: dataToUpdate.isStarred
      });
    } else {
      response = await axios.post('/apps/email/update-emails', {
        emailIds,
        dataToUpdate
      });
    }

    await dispatch(getMails(getState().email.params));
    return {
      emailIds,
      dataToUpdate,
      data: response.data
    };
  }
);

export const updateMailLabel = createAsyncThunk(
  'appEmail/updateMailLabel',
  async ({ emailIds, label }, { dispatch, getState }) => {
    const response = await axios.post('/apps/email/update-emails-label', {
      emailIds,
      label
    });
    await dispatch(getMails(getState().email.params));
    return response.data;
  }
);

export const paginateMail = createAsyncThunk('appEmail/paginateMail', async ({ dir, emailId }) => {
  const response = await axios.get('/apps/email/paginate-email', {
    params: { dir, emailId }
  });
  return response.data;
});

export const selectCurrentMail = createAsyncThunk('appEmail/selectCurrentMail', async (id) => {
  const response = await API.get(ENDPOINTS.GET_EMAIL_BY_ID + id);
  // const response = await axios.get('/apps/email/get-email', { id })
  return response.data;
});

export const appEmailSlice = createSlice({
  name: 'appEmail',
  initialState: {
    mails: [],
    params: {},
    emailsMeta: {},
    selectedMails: [],
    currentMail: null
  },
  reducers: {
    selectMail: (state, action) => {
      const selectedMails = state.selectedMails;
      if (!selectedMails.includes(action.payload)) {
        selectedMails.push(action.payload);
      } else {
        selectedMails.splice(selectedMails.indexOf(action.payload), 1);
      }
      state.selectedMails = selectedMails;
    },
    selectAllMail: (state, action) => {
      const selectAllMailsArr = [];
      if (action.payload) {
        selectAllMailsArr.length = 0;
        state.mails.forEach((mail) => selectAllMailsArr.push(mail._id));
      } else {
        selectAllMailsArr.length = 0;
      }
      state.selectedMails = selectAllMailsArr;
    },
    resetSelectedMail: (state) => {
      state.selectedMails = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMails.fulfilled, (state, action) => {
        let currMail = null;
        if (state.currentMail !== null && state.currentMail !== undefined) {
          currMail = action.payload.data.emails.find((i) => i?._id === state?._id);
        }
        state.currentMail = currMail;
        state.params = action.payload.params;
        state.mails = action.payload.data.emails;
        state.emailsMeta = action.payload.data.emailsMeta;
      })
      .addCase(updateMails.fulfilled, (state, action) => {
        function updateMailData(email) {
          Object.assign(email, action.payload.dataToUpdate);
        }
        state.mails.forEach((email) => {
          if (action.payload.emailIds.includes(email._id)) {
            updateMailData(email);
          }
        });
      })
      .addCase(paginateMail.fulfilled, (state, action) => {
        const data = action.payload;
        const dataIndex = state.mails.findIndex((i) => i._id === data._id);
        dataIndex === 0 ? (data.hasPreviousMail = false) : (data.hasPreviousMail = true);
        dataIndex === state.mails.length - 1
          ? (data.hasNextMail = false)
          : (data.hasNextMail = true);
        state.currentMail = data;
      })
      .addCase(selectCurrentMail.fulfilled, (state, action) => {
        state.currentMail = action.payload;
      });
  }
});

export const { selectMail, selectAllMail, resetSelectedMail } = appEmailSlice.actions;

export default appEmailSlice.reducer;
