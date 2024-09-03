/* eslint-disable no-unused-vars */
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { ENDPOINTS } from '../../../lib/endpoints';
import { customInterIceptors } from '../../../lib/AxiosProvider';
import { getUserData } from '../../../utility/Utils'

const API = customInterIceptors();

export const createForm = createAsyncThunk(
  'formBuilder/createForm', 
  async ( payload, { dispatch }) => {
  const response = await API.post(ENDPOINTS.CREATE_FORM, payload);
  return {
    id: response.data._id,
    data: response.data
  }
});


export const getFormData = createAsyncThunk(
  'formBuilder/getForms',
  async (params, {dispatch}) => {
    let response;
    response = await API.post(ENDPOINTS.GET_FORM, params)
    return {
      params,
      data: response.data
    }
  }
)

export const deleteForm = createAsyncThunk('formBuilder/deleteForm', async( {formId}, {dispatch, getState} ) => {
  const response = await API.post(ENDPOINTS.DELETE_FORM, {
      formId
  })
  await dispatch(getFormData(getUserData().id))

  return {
      formId,
      data: response.data
  }
})

export const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState:{
    selectedForms: [],
    forms: [],
    currentForm: null,
    params: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFormData.fulfilled, (state, action) => {
        let currForm = null;
        if (state.currentForm !== null && state.currentForm !== undefined) {
          currForm = action.payload.data.data.find((i) => i._id === state.currentForm._id);
        }
        state.currentForm = currForm;
        state.params = action.payload.params;
        state.forms = action.payload.data.data;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.currentForm = action.payload.data;
      });
  }
})

export const { } = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
