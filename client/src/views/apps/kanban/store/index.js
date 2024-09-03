// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { fetchWorkspaceApi, getSelectedWorkspaceData } from '../../workspace/store';

const API = customInterIceptors();

// // ** Fetch Boards
// export const fetchBoards = createAsyncThunk('appKanban/fetchBoards', async () => {
//   const response = await axios.get('/apps/kanban/boards');

//   return response.data;
// });

// export const fetchTasks = createAsyncThunk('appKanban/fetchTasks', async () => {
//   const response = await axios.get('/apps/kanban/tasks');

//   return response.data;
// });

// ** Fetch Boards - api
export const fetchBoardsApi = createAsyncThunk('appKanban/fetchBoards', async () => {
  const response = await API.get('/board/get');
  return response.data;
});

export const addBoard = createAsyncThunk('appKanban/addBoard', async (data, { dispatch }) => {
  const response = await API.post('/board/add', data);
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response.data;
});

export const updateBoardTitle = createAsyncThunk(
  'appKanban/updateBoardTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/board/update', data);
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    return response.data;
  }
);

export const deleteBoard = createAsyncThunk('appKanban/deleteBoard', async (data, { dispatch }) => {
  const response = await API.delete(`/board/delete/${data.id}/${data.workspaceId}`);
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response;
});

export const fetchTasksApi = createAsyncThunk('appKanban/fetchTasks', async () => {
  const response = await API.get('/kanban/get');
  // response.data.sort((a, b) => {
  //   return parseInt(a.id) - parseInt(b.id);
  // });
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response.data;
});

export const addTask = createAsyncThunk('appKanban/addTask', async (data, { dispatch }) => {
  const response = await API.post('/kanban/add', data);
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response.data;
});

export const updateTaskBoard = createAsyncThunk(
  'appKanban/updateTaskBoard',
  async (data, { dispatch }) => {
    const response = await API.post('/kanban/update-taskboard', data);
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    return response.data;
  }
);

export const updateTask = createAsyncThunk('appKanban/updateTask', async (data, { dispatch }) => {
  const response = await API.post('/kanban/update', data);
  // await dispatch(getSelectedWorkspaceData(workspaceId));
  return response.data;
});

export const reorderTasks = createAsyncThunk(
  'appKanban/reorder-tasks',
  async (data, { dispatch }) => {
    const response = await API.post('/kanban/reorder', data);
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('appKanban/delete', async (data, { dispatch }) => {
  const response = await API.delete('/kanban/delete', { data: { source: data } });
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response.data;
});

export const clearTasks = createAsyncThunk('appKanban/clearTasks', async (data, { dispatch }) => {
  const response = await API.delete(`/kanban/deleteByBoardId/${data.boardId}`);
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response;
});

export const appKanbanSlice = createSlice({
  name: 'appKanban',
  initialState: {
    tasks: [],
    boards: [],
    selectedTask: {}
  },
  reducers: {
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchBoards.fulfilled, (state, action) => {
      .addCase(fetchBoardsApi.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      // .addCase(fetchTasks.fulfilled, (state, action) => {
      .addCase(fetchTasksApi.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  }
});

export const { handleSelectTask } = appKanbanSlice.actions;

export default appKanbanSlice.reducer;
