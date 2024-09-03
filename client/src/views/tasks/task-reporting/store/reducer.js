import { createSlice } from '@reduxjs/toolkit';

export const Tasks = createSlice({
  name: 'tasks',
  initialState: {
    // add new Lead
    addTask: {
      loading: false,
      success: false,
      error: null
    },

    taskList: {
      loading: false,
      success: false,
      error: null,
      list: null
    },
    workingTaskList: {
      loading: false,
      success: false,
      error: null,
      list: null
    },

    workingTaskListPastDue: {
      loading: false,
      success: false,
      error: null,
      list: null
    },

    taskDelete: {
      loading: false,
      success: false,
      error: null
    },

    saveCheckList: {
      loading: false,
      success: false,
      error: null
    },

    // Edit Task
    editTask: {
      loading: false,
      success: false,
      error: null,
      task: null
    },

    // save Task List Todos
    saveTaskListTodos: {
      loading: false,
      success: false,
      error: null
    },

    // save Task List Todos
    todoFileUploading: {
      todo: null,
      file: null,
      loading: false,
      success: false,
      error: null
    },

    // send Email
    sendEmail: {
      loading: false,
      success: false,
      error: null
    }
  },
  reducers: {
    // ** add new Lead
    addTaskStart: (state) => {
      state.addTask.loading = true;
    },
    addTaskSuccess: (state) => {
      state.addTask.loading = false;
      state.addTask.success = true;
      state.addTask.error = null;
    },
    addTaskError: (state, action) => {
      state.addTask.loading = false;
      state.addTask.success = true;
      state.addTask.error = action.payload;
    },
    addTaskReset: (state, action) => {
      state.addTask.loading = false;
      state.addTask.success = false;
      state.addTask.error = null;
    },
    // ** Task List
    taskListStart: (state) => {
      state.taskList.loading = true;
    },
    taskListSuccess: (state, action) => {
      state.taskList.loading = false;
      state.taskList.success = true;
      state.taskList.error = null;
      state.taskList.list = action.payload;
    },
    taskListError: (state, action) => {
      state.taskList.loading = false;
      state.taskList.success = true;
      state.taskList.error = action.payload;
    },
    taskListReset: (state, action) => {
      state.taskList.loading = false;
      state.taskList.success = false;
      state.taskList.error = null;
    },

    // ** Working Task List
    workingTaskListStart: (state) => {
      state.workingTaskList.loading = true;
    },
    workingTaskListSuccess: (state, action) => {
      state.workingTaskList.loading = false;
      state.workingTaskList.success = true;
      state.workingTaskList.error = null;
      state.workingTaskList.list = action.payload;
    },
    workingTaskListError: (state, action) => {
      state.workingTaskList.loading = false;
      state.workingTaskList.success = true;
      state.workingTaskList.error = action.payload;
    },
    workingTaskListReset: (state, action) => {
      state.workingTaskList.loading = false;
      state.workingTaskList.success = false;
      state.workingTaskList.error = null;
    },

    // ** Working Task List past due
    workingTaskListPastDueStart: (state) => {
      state.workingTaskListPastDue.loading = true;
    },
    workingTaskListPastDueSuccess: (state, action) => {
      state.workingTaskListPastDue.loading = false;
      state.workingTaskListPastDue.success = true;
      state.workingTaskListPastDue.error = null;
      state.workingTaskListPastDue.list = action.payload;
    },
    workingTaskListPastDueError: (state, action) => {
      state.workingTaskListPastDue.loading = false;
      state.workingTaskListPastDue.success = true;
      state.workingTaskListPastDue.error = action.payload;
    },
    workingTaskListPastDueReset: (state, action) => {
      state.workingTaskListPastDue.loading = false;
      state.workingTaskListPastDue.success = false;
      state.workingTaskListPastDue.error = null;
    },
    // ** Task Delete
    taskDeleteStart: (state) => {
      state.taskDelete.loading = true;
    },
    taskDeleteSuccess: (state, action) => {
      state.taskDelete.loading = false;
      state.taskDelete.success = true;
      state.taskDelete.error = null;
    },
    taskDeleteError: (state, action) => {
      state.taskDelete.loading = false;
      state.taskDelete.success = true;
      state.taskDelete.error = action.payload;
    },
    taskDeleteReset: (state, action) => {
      state.taskDelete.loading = false;
      state.taskDelete.success = false;
      state.taskDelete.error = null;
    },
    // ** Task Delete
    saveCheckListStart: (state) => {
      state.saveCheckList.loading = true;
    },
    saveCheckListSuccess: (state, action) => {
      state.saveCheckList.loading = false;
      state.saveCheckList.success = true;
      state.saveCheckList.error = null;
    },
    saveCheckListError: (state, action) => {
      state.saveCheckList.loading = false;
      state.saveCheckList.success = true;
      state.saveCheckList.error = action.payload;
    },
    saveCheckListReset: (state, action) => {
      state.saveCheckList.loading = false;
      state.saveCheckList.success = false;
      state.saveCheckList.error = null;
    },
    // ** Task Update
    editTaskStart: (state) => {
      state.editTask.loading = true;
    },
    editTaskSuccess: (state, action) => {
      state.editTask.loading = false;
      state.editTask.success = true;
      state.editTask.error = null;
    },
    editTaskError: (state, action) => {
      state.editTask.loading = false;
      state.editTask.success = true;
      state.editTask.error = action.payload;
    },
    editTaskReset: (state, action) => {
      state.editTask.loading = false;
      state.editTask.success = false;
      state.editTask.error = null;
    },
    setEditTask: (state, action) => {
      state.editTask.task = action.payload;
    },

    // ** Task Delete
    saveTaskListTodosStart: (state) => {
      state.saveTaskListTodos.loading = true;
    },
    saveTaskListTodosSuccess: (state, action) => {
      state.saveTaskListTodos.loading = false;
      state.saveTaskListTodos.success = true;
      state.saveTaskListTodos.error = null;
    },
    saveTaskListTodosError: (state, action) => {
      state.saveTaskListTodos.loading = false;
      state.saveTaskListTodos.success = true;
      state.saveTaskListTodos.error = action.payload;
    },
    saveTaskListTodosReset: (state, action) => {
      state.saveTaskListTodos.loading = false;
      state.saveTaskListTodos.success = false;
      state.saveTaskListTodos.error = null;
    },
    // ** Task Delete
    todoFileUploadingInit: (state, action) => {
      state.todoFileUploading.todo = action.payload;
    },
    todoFileUploadingStart: (state) => {
      state.todoFileUploading.loading = true;
    },
    todoFileUploadingSuccess: (state, action) => {
      state.todoFileUploading.loading = false;
      state.todoFileUploading.success = true;
      state.todoFileUploading.error = null;
      state.todoFileUploading.file = action.payload;
    },
    todoFileUploadingError: (state, action) => {
      state.todoFileUploading.loading = false;
      state.todoFileUploading.success = true;
      state.todoFileUploading.error = action.payload;
    },
    todoFileUploadingReset: (state, action) => {
      state.todoFileUploading.loading = false;
      state.todoFileUploading.success = false;
      state.todoFileUploading.error = null;
    },
    // ** Send Email
    sendEmailStart: (state) => {
      state.sendEmail.loading = true;
    },
    sendEmailSuccess: (state, action) => {
      state.sendEmail.loading = false;
      state.sendEmail.success = true;
      state.sendEmail.error = null;
      state.sendEmail.file = action.payload;
    },
    sendEmailError: (state, action) => {
      state.sendEmail.loading = false;
      state.sendEmail.success = true;
      state.sendEmail.error = action.payload;
    }
  }
});

export const {
  // Add
  addTaskStart,
  addTaskSuccess,
  addTaskError,
  addTaskReset,

  // Task List
  taskListStart,
  taskListSuccess,
  taskListError,
  taskListReset,

  // Task List
  taskDeleteStart,
  taskDeleteSuccess,
  taskDeleteError,
  taskDeleteReset,
  // Task List
  saveCheckListStart,
  saveCheckListSuccess,
  saveCheckListError,
  saveCheckListReset,

  // Update Task
  editTaskStart,
  editTaskSuccess,
  editTaskError,
  editTaskReset,
  setEditTask,

  // Working Task List
  workingTaskListStart,
  workingTaskListSuccess,
  workingTaskListError,
  workingTaskListReset,

  // Save Task Todos
  saveTaskListTodosStart,
  saveTaskListTodosSuccess,
  saveTaskListTodosError,
  saveTaskListTodosReset,

  // UPload Todo file
  todoFileUploadingInit,
  todoFileUploadingStart,
  todoFileUploadingSuccess,
  todoFileUploadingError,
  todoFileUploadingReset,

  // Working Task List
  workingTaskListPastDueStart,
  workingTaskListPastDueSuccess,
  workingTaskListPastDueError,
  workingTaskListPastDueReset,

  // Send Email
  sendEmailStart,
  sendEmailSuccess,
  sendEmailError
} = Tasks.actions;

export default Tasks.reducer;
