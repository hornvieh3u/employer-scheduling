// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** Custom Intercepter
import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { getUserData } from '../../../../utility/Utils';

const API = customInterIceptors();

export const getTasks = createAsyncThunk('appTodo/getTasks', async (params) => {
  const response = await axios.get('/apps/todo/tasks', { params });

  return {
    params,
    data: response.data
  };
});

export const addTask = createAsyncThunk('appTodo/addTask', async (task, { dispatch, getState }) => {
  const response = await axios.post('/apps/todo/add-tasks', { task });
  await dispatch(getTasks(getState().todo.params));
  return response.data;
});

export const updateTask = createAsyncThunk(
  'appTodo/updateTask',
  async (task, { dispatch, getState }) => {
    const response = await axios.post('/apps/todo/update-task', { task });
    await dispatch(getTasks(getState().todo.params));
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'appTodo/deleteTask',
  async (taskId, { dispatch, getState }) => {
    const response = await axios.delete('/apps/todo/delete-task', { taskId });
    await dispatch(getTasks(getState().todo.params));
    return response.data;
  }
);

// ** File Manager API
export const uploadFile = createAsyncThunk(
  'filemanager/fileupload',
  async (form, { dispatch, getState }) => {
    const response = await API.post('/file-manager/fileupload', form);
    await dispatch(getFileAndFolders(getState().filemanager.currentPath));
    return response.data;
  }
);

export const addNewFolder = createAsyncThunk(
  'filemanager/add-new-folder',
  async ({ path, name }, { dispatch, getState }) => {
    const response = await API.post('file-manager/new-folder', {
      path,
      name,
      userId: getUserData().id
    });
    await dispatch(getFileAndFolders(getState().filemanager.currentPath));
    return response.data;
  }
);

export const getFileAndFolders = createAsyncThunk(
  'filemanager/getfiles',
  async (path, { dispatch, getState }) => {
    const response = await API.post('/file-manager/get-files', { path, userId: getUserData().id });
    return response.data;
  }
);

export const renameFolder = createAsyncThunk(
  'filemanager/renameFolder',
  async ({ fileId, folderName }, { dispatch, getState }) => {
    const response = await API.post(`/file-manager/rename-folder/${fileId}`, { folderName });
    await dispatch(getFileAndFolders(getState().filemanager.currentPath));
    return response.data;
  }
);

export const deleteFolder = createAsyncThunk(
  'filemanager/deleteFolder',
  async (fileId, { dispatch, getState }) => {
    const response = await API.delete(`/file-manager/delete-folder/${fileId}`);
    await dispatch(getFileAndFolders(getState().filemanager.currentPath));
    return response.data;
  }
);

export const appTodoSlice = createSlice({
  name: 'appTodo',
  initialState: {
    tasks: [],
    selectTasks: [],
    selectedTask: {},
    params: {
      filter: '',
      q: '',
      sort: '',
      tag: ''
    },
    currentPath: '/',
    files: [],
    folders: [],
    selectedRows: []
  },
  reducers: {
    addSelectedTask: (state, action) => {
      state.selectTasks.push(action.payload);
    },
    deleteSelectedTask: (state, action) => {
      state.selectTasks.splice(action.payload, 1);
    },
    reOrderTasks: (state, action) => {
      state.tasks = action.payload;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    nextPath: (state, action) => {
      state.currentPath = state.currentPath + action.payload + '/';
    },
    prevPath: (state, action) => {
      const subPaths = state.currentPath.split('/');
      let newPath = '';
      if (subPaths.length > 2) {
        for (let i = 0; i < subPaths.length - 2; i++) {
          newPath = newPath + subPaths[i] + '/';
        }
      }

      state.currentPath = newPath;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.params = action.payload.params;
    }),
      builder.addCase(getFileAndFolders.fulfilled, (state, action) => {
        state.files = action.payload.filter((file) => file.type !== 'directory');
        state.folders = action.payload.filter((file) => file.type === 'directory');
      });
  }
});

export const {
  reOrderTasks,
  selectTask,
  addSelectedTask,
  deleteSelectedTask,
  nextPath,
  prevPath,
  setCurrentPath,
  setSelectedRows
} = appTodoSlice.actions;

export default appTodoSlice.reducer;
