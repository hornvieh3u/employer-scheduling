import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();

//leads
export const getLeadsList = (payload) => {
  return API.get('/lead-contact/list', {
    params: payload
  });
};
export const getTotalLeads = () => {
  return API.get('/lead-contact/total-contact-count');
};

//client
export const getClientList = (options) => {
  return API.get('/client-contact', {
    params: options
  });
};
export const getTotalClients = () => {
  return API.get('/client-contact/total-clients-count');
};

//employee
export const getEmployeeList = (options) => {
  return API.get('/employee-contact/list', {
    params: options
  });
};
export const getTotalEmployees = () => {
  return API.get(`/employee-contact/total-employee`);
};
//relationships
export const getRelationshipsList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};
export const getTotalRelationships = () => {
  return API.get('/relation-contact/total-contact-count');
};

//vendors
export const getTotalVendors = () => {
  return API.get('/vendor-contact/total-contact-count');
};
export const getVendorsList = (payload) => {
  return API.get('/vendor-contact/list', {
    params: payload
  });
};
