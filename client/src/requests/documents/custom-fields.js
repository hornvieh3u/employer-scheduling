import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

//add field
export async function addCustomField(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.ADD_CUSTOM_FIELD, payload);

    if (data.success === true) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
}

//delete field
export async function deleteCustomField(id) {
  try {
    const { data } = await API.delete(ENDPOINTS.DELETE_CUSTOM_FIELD + id);
    if (data.success === true) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('An error occured please try again later');
  }
}
//get fields
export async function getCustomField() {
  try {
    const { data } = await API.get(ENDPOINTS.GET_CUSTOM_FIELDS_BY_USER);
    if (data.success === true) {
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('An error occured please try again later');
  }
}
