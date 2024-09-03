// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  deleteDocuments,
  getReceivedDocuments,
  getUserDocuments
} from '../../../requests/documents/create-doc';

const getData = async () => {
  const docs = await getUserDocuments();
  const inbox = await getReceivedDocuments();
  const i = inbox.map((d) => {
    let tags = ['inbox'];
    if (d.recipients.filter((x) => x?.isDone === true).length === 0) {
      tags.push('waiting');
    }
    if (d.recipients.length === d.recipients.filter((x) => x?.isDone === true).length) {
      tags.push('completed');
    }
    if (
      d.recipients.length > d.recipients.filter((x) => x?.isDone === true).length &&
      d.recipients.filter((x) => x?.isDone === true).length > 0
    ) {
      tags.push('viewed');
    }
    if (d.properties.filter((x) => x.type === 'attachment' && x?.list?.length > 0).length > 0) {
      tags.push('attachment');
    }
    d.tags = tags;
    return d;
  });
  
  
  const documents = docs.map((d) => {
    let tags = [];
    if (d.isSent === true) {
      tags.push('sent');
    } else if (d.isVoided === true) {
      tags.push('voided');
    } else if (d.isSent !== true) {
      tags.push('draft');
    }
    if (d.recipients.filter((x) => x?.isDone === true).length === 0) {
      tags.push('waiting');
    }
    if (d.recipients.length === d.recipients.filter((x) => x?.isDone === true).length) {
      tags.push('completed');
    }
    if (d.recipients.filter((x) => x?.hasViewed).length > 0) {
      tags.push('viewed');
    }
    //check attachment

    if (d.properties.filter((x) => x.type === 'attachment' && x?.list?.length > 0).length > 0) {
      tags.push('attachment');
    }
    d.tags = tags;
    
    return d;
  });
  
  let res = [...i, ...documents];
  
  const docsMeta = {
    inbox: inbox.length,
    sent: res.filter((x) => x.tags.includes('sent')).length,
    draft: res.filter((x) => x.tags.includes('draft')).length,
    voided: res.filter((x) => x.tags.includes('voided')).length,
    waiting: res.filter((x) => x.tags.includes('waiting')).length,
    viewed: res.filter((x) => x.tags.includes('viewed')).length,
    completed: res.filter((x) => x.tags.includes('completed')).length
  };
  
  return {docs: res, docsMeta: docsMeta };
};

export const getDocs = createAsyncThunk('appDocs/getDocuments', async (params) => {
  const { docs, docsMeta } = await getData();
  let result = docs.filter((x) => x.tags.includes(params.folder));
  if (params.label) {
    result = docs.filter((x) => x.tags.includes(params.label));
  }
  
  return {
    params,
    data: result,
    docsMeta: docsMeta,
    total:result.length
  };
});

export const searchDocuments = createAsyncThunk('appDocs/searchDocuments', async (params) => {
  const { docs, docsMeta } = await getData();
  const res = docs.filter((x) => x.documentDetails.name.includes(params.query));
  return {
    params,
    data: res,
    docsMeta: docsMeta,
    total:res.length
  };
});

export const deleteDocs = createAsyncThunk(
  'appDocs/deleteDocs',
  async ({ ids }, { dispatch, getState }) => {
    await deleteDocuments(ids);
    await dispatch(getDocs(getState().documents.params));
    return {
      ids: ids
    };
  }
);

export const appDocsSlice = createSlice({
  name: 'appDocs',
  initialState: {
    docs: [],
    params: {},
    total: 0,
    selectedDocs: [],
    docsMeta: { inbox: 0, draft: 0, sent: 0, waiting: 0 }
  },
  reducers: {
    selectDoc: (state, action) => {
      const selectedDocs = state.selectedDocs;
      if (!selectedDocs.includes(action.payload)) {
        selectedDocs.push(action.payload);
      } else {
        selectedDocs.splice(selectedDocs.indexOf(action.payload), 1);
      }
      state.selectedDocs = selectedDocs;
    },
    selectAllMail: (state, action) => {
      const selectAllMailsArr = [];
      if (action.payload) {
        selectAllMailsArr.length = 0;
        state.docs.forEach((doc) => selectAllMailsArr.push(doc.documentId));
      } else {
        selectAllMailsArr.length = 0;
      }
      state.selectedDocs = selectAllMailsArr;
    },
    resetSelectedMail: (state) => {
      state.selectedDocs = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocs.fulfilled, (state, action) => {
        state.total = action.payload.data.length;
        state.params = action.payload.params;
        state.docs = action.payload.data;
        state.docsMeta = action.payload.docsMeta;
      })
      .addCase(deleteDocs.fulfilled, (state, action) => {
        state.docs.filter((x) => x.documentId !== action.payload.ids.includes(x.documentId));
      })
      .addCase(searchDocuments.fulfilled, (state, action) => {
        state.docs = action.payload.data;
        state.params = action.payload.params;
      });
  }
});

export const { selectDoc, selectAllMail, resetSelectedMail } = appDocsSlice.actions;

export default appDocsSlice.reducer;
