// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();


// ** Fetch Labels - api
export const fetchLabelsApi = createAsyncThunk('appLabel/fetchLabels', async () => {
  const response = await API.get('/label/get');
  console.log("label data",response);
  return response.data;
});

export const addLabel = createAsyncThunk('appLabel/addLabel', async (data, { dispatch }) => {
  const response = await API.post('/label/add', data);
  await dispatch(fetchLabelsApi());
  return response.data;
});

export const updateLabel = createAsyncThunk(
  'appLabel/updateLabel',
  async (data, { dispatch }) => {
    const response = await API.post('/label/update', data);
    await dispatch(fetchLabelsApi());
    return response.data;
  }
);

export const deleteLabel = createAsyncThunk('appLabel/deleteLabel', async (id, { dispatch }) => {
  const response = await API.delete(`/label/delete/${id}`);
  await dispatch(fetchLabelsApi());
  return response;
});

export const appLabelSlice = createSlice({
  name: 'appLabel',
  initialState: {
    labels: [],
    selectedLabel: {}
  },
  reducers: {
    handleSelectLabel: (state, action) => {
      state.selectedLabel = action.payload;
    }
  },
   extraReducers: (builder) => {
    builder.addCase(fetchLabelsApi.fulfilled, (state, action) => {
      state.labels = action.payload;
    });
  }
});

export const { handleSelectLabel } = appLabelSlice.actions;

export default appLabelSlice.reducer;
