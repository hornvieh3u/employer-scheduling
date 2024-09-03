/*    eslint-disable */
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

//** Get tables Data
export async function getTableData(id) {
  try {
    const responce = await API.get(ENDPOINTS.GET_TABLES + id);
    if (responce?.data.success === true) {
      return responce;
    } else {
      toast.error('Failed to load data!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Create new Table
export async function createNewTable(payload) {
  try {
    const responce = await API.post(ENDPOINTS.CREATE_NEW_TABLE, payload);
    if (responce?.data.success === true) {
      toast.success('New group created successfully!');
      return responce;
    } else {
      toast.error('Failed to create a group!');
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

//** Update Table Data
export async function updateTable(payload) {
  try {
    const responce = await API.put(ENDPOINTS.UPDATE, payload);
    if (responce?.data.success === true) {
      toast.success('Data updated successfully!');
      return responce;
    } else {
      toast.error('Data update failed!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Add new row on table
export async function addRow(payload) {
  try {
    const responce = await API.post(ENDPOINTS.ADD_ROW, payload);

    if (responce?.data.success === true) {
      toast.success('New project added successfully!');
      return responce;
    } else {
      toast.error('Failed to add a new project!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Add new Column
export async function addColumn(payload) {
  try {
    const responce = await API.post(ENDPOINTS.ADD_COLUMN, payload);
    console.log(responce,"Managerresponce")
    if (responce?.data.success === true) {
      toast.success('New Column added successfully!');
      return responce;
    } else {
      toast.error('Failed to add a new column!');
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Delete table
export async function deleteTable(payload) {
  try {
    const responce = await API.delete(ENDPOINTS.DELETE_TABLE, payload);
    if (responce?.data.success === true) {
      toast.success('Group deleted successfully!');
      return responce;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Delete row('s) from table
export async function deleteRow(payload) {
  try {
    const responce = await API.delete(ENDPOINTS.DELETE_ROW, payload);

    if (responce?.data.success === true) {
      toast.success('Project(s) deleted successfully!');
      return responce;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}

//** Delete row('s) from table
export async function deleteColumn(payload) {
  try {
    const responce = await API.delete(ENDPOINTS.DELETE_COLUMN, payload);

    if (responce?.data.success === true) {
      toast.success('Column deleted successfully!');
      return responce;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Please try again later!');
  }
}
