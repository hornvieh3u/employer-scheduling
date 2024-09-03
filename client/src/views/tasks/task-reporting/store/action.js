import * as api from './api';

import {
  // ------------------
  // add task
  addTaskStart,
  addTaskSuccess,
  addTaskError,
  // Task List
  taskListStart,
  taskListSuccess,
  taskListError,
  // Task Delete
  taskDeleteStart,
  taskDeleteSuccess,
  taskDeleteError,
  // save Checklist
  saveCheckListStart,
  saveCheckListSuccess,
  saveCheckListError,

  // Task List

  // Working Task List
  workingTaskListStart,
  workingTaskListSuccess,
  workingTaskListError,
  workingTaskListReset,

  // ----------------- save todos
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

  // working task list past due
  workingTaskListPastDueStart,
  workingTaskListPastDueSuccess,
  workingTaskListPastDueError,
  workingTaskListPastDueReset,

  // Send email
  sendEmailStart,
  sendEmailSuccess,
  sendEmailError
} from './reducer';

// add task
export const addTaskAction = (payload) => async (dispatch) => {
  try {
    dispatch(addTaskStart());
    const { data } = await api.addTask(payload);
    dispatch(addTaskSuccess(data));

    // console.log('Task Added')
    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    // console.log(error)
    dispatch(addTaskError());
  }
};

// task list
export const fetchTaskListAction = (payload) => async (dispatch) => {
  try {
    dispatch(taskListStart());
    const { data } = await api.taskList(payload);
    dispatch(taskListSuccess(data));
  } catch (error) {
    // console.log(error.response)
    dispatch(taskListError());
  }
};

// task Delete
export const taskDeleteAction = (payload) => async (dispatch) => {
  try {
    dispatch(taskDeleteStart());
    const { data } = await api.taskDelete(payload);
    dispatch(taskDeleteSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    // console.log(error)
    dispatch(taskDeleteError());
  }
};

// task Delete
export const saveCheckListAction = (payload) => async (dispatch) => {
  try {
    dispatch(saveCheckListStart());
    const { data } = await api.saveCheckList(payload);
    dispatch(saveCheckListSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    // console.log(error)
    dispatch(saveCheckListError());
  }
};

// task Delete
export const workingTaskListAction = (payload) => async (dispatch) => {
  try {
    dispatch(workingTaskListStart());
    const { data } = await api.fetchWorkingTaskList(payload);
    dispatch(workingTaskListSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    // console.log(error)
    dispatch(workingTaskListError());
  }
};

// task Delete
export const saveTodosAnsAction = (payload) => async (dispatch) => {
  try {
    dispatch(saveTaskListTodosStart());
    const { data } = await api.saveCheckListAns(payload);
    dispatch(saveTaskListTodosSuccess(data));

    // Refetch task again
    dispatch(workingTaskListAction({}));
  } catch (error) {
    // console.log(error)
    dispatch(saveTaskListTodosError());
  }
};

// task todo file
export const uploadTodoAnsFile = (payload) => async (dispatch) => {
  try {
    dispatch(todoFileUploadingStart());
    const { data } = await api.todoFileUpload(payload);
    dispatch(todoFileUploadingSuccess(data));

    // console.log(data)
    // Refetch task again
    // dispatch(workingTaskListAction({}))
  } catch (error) {
    // console.log(error)
    dispatch(todoFileUploadingError());
  }
};

// task Delete
export const workingTaskListPastDueAction = (payload) => async (dispatch) => {
  try {
    dispatch(workingTaskListPastDueStart());
    const { data } = await api.fetchWorkingTaskPastDueList(payload);
    dispatch(workingTaskListPastDueSuccess(data));

    // Refetch task again
    // dispatch(fetchTaskListAction({}))
  } catch (error) {
    // console.log(error)
    dispatch(workingTaskListPastDueError());
  }
};

// send Email
export const sendEmail = (payload) => async (dispatch) => {
  try {
    dispatch(sendEmailStart());
    const { data } = await api.sendMail(payload);
    dispatch(sendEmailSuccess(data));
  } catch (error) {
    // console.log(error)
    dispatch(sendEmailError());
  }
};
