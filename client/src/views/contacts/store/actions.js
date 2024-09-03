import * as api from './api';

import {
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  clientContactsReducer,
  totalCountReducer
} from './reducer';
//------totals
//total client
export const totalContactsAction = () => async (dispatch) => {
  try {
    const clients = await api.getTotalClients();
    const leads = await api.getTotalLeads();
    const vendors = await api.getTotalVendors();
    const relationships = await api.getTotalRelationships();
    const employees = await api.getTotalEmployees();
    const payload = {
      clients: clients.data,
      leads: leads.data,
      vendors: vendors.data,
      relationships: relationships.data,
      employees: employees.data,
      total: clients.data + leads.data + vendors.data + relationships.data + employees.data
    };
    dispatch(totalCountReducer(payload));
  } catch (error) {
    //
  }
};

//---------data
//client list
export const clientContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getClientList();
    dispatch(clientContactsReducer(data));
  } catch (error) {
    //
  }
};
//lead list
export const leadsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadsList();
    dispatch(leadContactsReducer(data));
  } catch (error) {
    //
  }
};
//vendor List
export const vendorContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getVendorsList();
    dispatch(vendorContactsReducer(data));
  } catch (error) {
    //
  }
};
//relationships list
export const relationshipsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getRelationshipsList();
    dispatch(relationshipContactsReducer(data));
  } catch (error) {
    //
  }
};
//employee list
export const employeesContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeList();
    dispatch(employeeContactsReducer(data));
  } catch (error) {
    //
  }
};
//---pagination
//client list

//lead list

//vendor List

//relationships list

//employee list

//--------selecting
//selected contacts
