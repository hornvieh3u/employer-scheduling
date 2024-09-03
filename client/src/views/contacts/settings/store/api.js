import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// group crud
const getGroups = params => API.get('/employee-group', params);
const createGroup = group => API.post('/employee-group', group);
const updateGroup = (id, group) => API.post('/employee-group/update', {id, group});
const deleteGroup = id => API.post('/employee-group/delete', { id });

// position crud
const getPositions = params => API.get('/employee-contact/position', params);
const createPosition = position => API.post('/employee-contact/position', position);
const updatePosition = (id, position) => API.put(`/employee-contact/position/${id}`, { position });
const deletePosition = id => API.delete(`/employee-contact/position/${id}`);

// shift crud
const getShifts = params => API.get('/employee-shift', params);
const createShift = shift => API.post('/employee-shift', shift);
const updateShift = (id, shift) => API.post('/employee-shift/update', {id, shift});
const deleteShift = id => API.post('/employee-shift/delete', { id });

const getSchedules = params => API.get('/employee-schedule/week', { params });

const addEmployeesToSchedule = employeeIds => API.post('/employee-schedule/add/employees', { employeeIds });
const addShiftsToSchedule = params => API.post('/employee-schedule/add/shifts', { params });

const updateEmployeePosition = params => API.post('/employee-contact/update/position', { params });
const updateShiftSchedule = params => API.post('/employee-schedule/update/shift', { params });

export {
  // group
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup,
  // position
  createPosition,
  getPositions,
  updatePosition,
  deletePosition,
  // shift
  createShift,
  getShifts,
  updateShift,
  deleteShift,
  getSchedules,
  addEmployeesToSchedule,
  addShiftsToSchedule,
  updateEmployeePosition,
  updateShiftSchedule
};