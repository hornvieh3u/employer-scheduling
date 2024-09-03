// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();

export const GetBalanceInfo = createAsyncThunk(
  'appDeposit/GetBalance',
  async (id, { dispatch, getState }) => {
    const response = await API.get(`/deposit/balance/${id}`);
    return {
      data: response.data?.data
    };
  }
);
export const handelCallModel = createAsyncThunk(
  'appDeposit/handelCallModel',
  async (data, { dispatch, getState }) => {
    return {
      data: data
    };
  }
);
export const GetCallHistory = createAsyncThunk(
  'appDeposit/handelCallHistory',
  async (id, { dispatch, getState }) => {
    const response = await API.get(`/voice/showCallHistory/${id}`);
    return {
      data: response?.data
    };
  }
);
export const appDepositSlice = createSlice({
  name: 'appEmail',
  initialState: {
    balanceInfo: {},
    openCallModel: {},
    callHistory: []
  },
  // reducers: {
  //     selectMail: (state, action) => {
  //         const selectedMails = state.selectedMails
  //         if (!selectedMails.includes(action.payload)) {
  //             selectedMails.push(action.payload)
  //         } else {
  //             selectedMails.splice(selectedMails.indexOf(action.payload), 1)
  //         }
  //         state.selectedMails = selectedMails
  //     }
  // }
  extraReducers: (builder) => {
    builder.addCase(GetBalanceInfo.fulfilled, (state, action) => {
      state.balanceInfo = action.payload;
    });
    builder.addCase(handelCallModel.fulfilled, (state, action) => {
      state.openCallModel = action.payload?.data;
    });
    builder.addCase(GetCallHistory.fulfilled, (state, action) => {
      state.callHistory = action.payload?.data?.data;
    });
  }
});

export const {} = appDepositSlice.actions;

export default appDepositSlice.reducer;
