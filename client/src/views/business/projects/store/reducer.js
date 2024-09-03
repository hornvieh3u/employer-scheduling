import { createSlice } from '@reduxjs/toolkit';

export const projectManagement = createSlice({
  name: 'projectManagement',
  initialState: {
    getProjects: []
  },
  reducers: {

    getProjectsData: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 1 && !action.payload[0]) {
        state.getProjects = [];
      } else {
        state.getProjects = action.payload;
      }
    },
       // getProjectsData: (state, action) => {
    //   state.getProjects = action.payload;
    // }
  }
});

export const { getProjectsData } = projectManagement.actions;

export default projectManagement.reducer;
