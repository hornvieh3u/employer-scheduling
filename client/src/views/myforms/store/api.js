import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const addNewEmployeeContactAction = (addNewEmployee) => {
  return API.post('/employee-contact/add', addNewEmployee);
};

export const deleteContactReqeust = (payload) => {
  return API.post('/employee-contact/delete', payload);
};

export const employeeListAction = (options) => {
  return API.get('/employee-contact/list', {
    params: options
  });
};

export const contactById = (_id) => {
  return API.get('/employee-contact/contact/' + _id);
};

export const contactUpdate = (payload) => {
  return API.post('/employee-contact/contact-update', payload);
};

export const contactRegisterUpdate = (payload) => {
  return API.post('/employee-contact/contact-register-update', payload);
};

export const uploadAvatarReqeust = (payload) =>
  API.post(`/employee-contact/upload-avatar`, payload);

export const updateSocialLinkRequest = (payload) =>
  API.post(`/employee-contact/update-social-links`, payload);

export const rankAddOrUpdateRequest = (payload) =>
  API.post(`/employee-contact/rank-add-or-update`, payload);

export const rankDeleteRequest = (payload) => API.post(`/employee-contact/delte-rank`, payload);

// ** File Section
export const fileAddReqeust = (payload) => API.post(`/employee-contact/file-add`, payload);

export const fileEditReqeust = (payload) => API.post(`/employee-contact/file-edit`, payload);

export const fileDeleteReqeust = (payload) => API.post(`/employee-contact/file-delete`, payload);

export const billingAddressUpdateReqeust = (payload) =>
  API.post(`/employee-contact/billing-address-update`, payload);

// Count

export const totalEmployeeCount = (payload) => API.get(`/employee-contact/total-employee`, payload);

export const ActiveEmployeeCount = (payload) =>
  API.get(`/employee-contact/active-employee`, payload);

export const InternshipEmployeeCount = (payload) =>
  API.get(`/employee-contact/internship-employee`, payload);

export const FormerEmployeeCount = (payload) =>
  API.get(`/employee-contact/former-employee`, payload);

export const importCOntactReqeust = (data) => {
  return API.post('/employee-contact/import-contact-array', data);
};

// ** workHistory

export const apiStartWork = async (userId, description) => {
  const response = await API.post('/employee-contact/workhistory/startwork', {
    userId: userId,
    description: description
  });
  localStorage.setItem('currentWork', JSON.stringify(response?.data));
  return response;
};

export const apiUpdateWork = async (historyId, screenshot) => {
  const response = await API.post('/employee-contact/workhistory/updatework', {
    historyId: historyId,
    screenshot: screenshot
  });
  return response;
};

export const apiEndWork = async (historyId) => {
  const response = await API.post('/employee-contact/workhistory/endwork', {
    historyId: historyId
  });
  return response;
};

export const getWorkHistoryTimeLine = async (id) => {
  const response = await API.get(`/employee-contact/workhistory/${id}`, { id: id });
  return response.data;
};

export const getWorkHistoryOverView = async (id) => {
  const response = await API.get(`/employee-contact/workhistory/overview/${id}`, { id: id });
  return response.data;
};

export const getScreenshots = async (historyId) => {
  const response = await API.get(`employee-contact/workhistory/screenshot/${historyId}`, {
    historyId: historyId
  });
  return response.data;
};
