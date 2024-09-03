import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const addTask = (payload) => {
  return API.post('/task', payload);
};
export const taskList = (payload) => {
  return API.get('/task', {
    params: payload
  });
};
export const taskDelete = (payload) => {
  return API.patch('/task/delete/' + payload._id);
};

export const saveCheckList = (payload) => {
  return API.post('/task/save-checklist', payload);
};

export const fetchWorkingTaskList = (payload) => {
  return API.get('/task/get-todays-task', {
    params: payload
  });
};

export const fetchWorkingTaskPastDueList = (payload) => {
  return API.get('/task/past-due-task', {
    params: payload
  });
};

export const saveCheckListAns = (payload) => {
  return API.post('/task/save-task-checklist', payload);
};

export const todoFileUpload = (payload) => {
  return API.post('/utill/upload', payload);
};

export const sendMail = (payload) => {
  return API.post('/task/send-mail', payload);
};
