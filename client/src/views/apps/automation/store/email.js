import { toast } from "react-toastify"
import { customInterIceptors } from '../../../../lib/AxiosProvider'
const userData = JSON.parse(localStorage.getItem("userData"))
const API = customInterIceptors()


const getUserId = () => {
  return userData.id;
};

const getHeaders = () => {
  return {
    'content-type': 'application/json'
  };
};

const getHeadersForFile = () => {
  return {
    'Content-Type': 'multipart/form-data'
  };
};

const toastCSS = () => {
  return {
    position: 'top-center',
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
};
export const GET_SENT_EMAILS = () => {
  let url = `/api/all_sent/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, { headers: getHeaders() });
      if (res.data.success) {
        dispatch({
          type: 'GET_SENT_EMAILS',
          payload: res.data.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_CATEGORIES_EMAIL = (urlPath) => {
  let url = `${urlPath}/category_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_CATEGORIES_EMAIL',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const GET_ALL_SECHEDULE_EMAIL = () => {
  let url = `/api/scheduleListing/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ALL_SECHEDULE_EMAIL',
          payload: response.data?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const ADD_NEW_MAIN_FOLDER_EMAIL = (urlPath, data) => {
  let url = `${urlPath}/addCategory/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success('folder added successfully!', toastCSS());
        dispatch(GET_CATEGORIES_EMAIL(urlPath));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const VERIFY_NEW_EMAIL_ADDRESS = (payload) => {
  let url = `/api/emailsendgrid/sendverification/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        GET_ACTIVE_OR_INACTIVE_LIST();
        dispatch({
          type: 'VERIFY_NEW_EMAIL_ADDRESS_RESPONSE',
          payload: response.data
        });
        toast.info(response.data?.msg, toastCSS);
      } else {
        dispatch({
          type: 'VERIFY_NEW_EMAIL_ADDRESS_ERROR',
          payload: response.data?.msg
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_ACTIVE_OR_INACTIVE_LIST = () => {
  let url = `/api/getsendgridverification/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response?.data?.success) {
        dispatch({
          type: 'GET_ACTIVE_OR_INACTIVE_LIST',
          payload: response.data?.resp?.sendgridVerification
        });
      } else {
        toast.error('Unable to fetch data!', toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_EMAIL_FROM_VERIFICATION_LIST = (email) => {
  let url = `/api/delete/verifiedsendgriduser/${getUserId()}/${email?.toLowerCase()}`;
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response?.data?.success) {
        GET_ACTIVE_OR_INACTIVE_LIST();
        toast.info(response?.data?.msg, toastCSS());
      } else {
        toast.error('Unable to fetch data!', toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const SEND_LINK_FOR_VERIFICATION = (payload) => {
  let url = `/api/sendgridverification/emails/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        dispatch(GET_ACTIVE_OR_INACTIVE_LIST());
        toast.success(response.data?.msg, toastCSS());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const ADD_NEW_SUB_FOLDER_EMAIL = (urlPath, data, folderId) => {
  let url = `${urlPath}/create_folder/${getUserId()}/${folderId}`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch(GET_CATEGORIES_EMAIL(urlPath));
        toast.success('Subfolder added successfully!', toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER = (urlPath, payload) => {
  let url = `${urlPath}/drag_drop_templete/${getUserId()}`;
  return async (dispatch) => {
    try {
      await API.put(url, payload, { headers: getHeaders() });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const SWAP_TEMPLATE = (folderID, payload) => {
  let url = `/api/email_nurturing/swap_templete/${getUserId()}/${folderID}`;
  return async (dispatch) => {
    try {
      await API.put(url, payload, { headers: getHeaders() });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const SEND_EMAIL = (Urlpath, payload) => {
  let url = `${Urlpath}/send_email/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.post(url, payload, {
        headers: getHeadersForFile()
      });
      if (res.data?.success) {
        toast.success('Mail sent successfully!', toastCSS());
        dispatch(GET_SENT_EMAILS());
      } else {
        toast.info(res.data?.msg + ' please select valid smartlist', toastCSS());
      }
    } catch (error) {
      toast.error(error.error.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const ADD_TEMPLATE_TO_EMAIL = (Urlpath, data) => {
  let url = `${Urlpath}/add_template/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, {
        headers: getHeadersForFile()
      });
      if (response.data?.success) {
        toast.info(response.data?.msg, toastCSS());
        dispatch(GET_SCHEDULE_MAILS(Urlpath));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_TEMPLATE_TO_EMAIL = (UrlPath, payload, templateId, FId) => {
  let url = `${UrlPath}/update_template/${getUserId()}/${templateId}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, {
        headers: getHeadersForFile()
      });
      if (response.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_SCHEDULE_MAILS(UrlPath, FId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const MAKE_TEMPLATE_AS_FAVORITES = (UrlPath, payload, templateId, FId) => {
  let url = `${UrlPath}/marks_as_star/${getUserId()}/${templateId}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, {
        headers: getHeaders()
      });
      if (response.data?.success) {
        dispatch(GET_SCHEDULE_MAILS(UrlPath, FId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const MAKE_TEMPLATE_AS_ACTIVATE = (UrlPath, payload, FId) => {
  let url = `/api/activate_mail/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, {
        headers: getHeaders()
      });
      if (response.data?.success) {
        dispatch(GET_SCHEDULE_MAILS(UrlPath, FId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_MULTIPLE_TEMPLATE = (Urlpath, data, id) => {
  let url = `${Urlpath}/multipal_remove_template/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await API.delete(url, {
        headers: getHeaders(),
        data: data
      });
      if (response.data?.success) {
        toast.info(response.data?.msg, toastCSS());
        dispatch(GET_SCHEDULE_MAILS(Urlpath, id));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_CATEGORY_EMAIL = (UrlPath, folderId) => {
  let url = `${UrlPath}/remove_category/${getUserId()}/${folderId}`;
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data) {
        dispatch(GET_CATEGORIES_EMAIL(UrlPath));
        toast.success(response?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_SUB_FOLDER_EMAIL = (UrlPath, folderId) => {
  let url = `${UrlPath}/delete_folder/${getUserId()}/${folderId}`;
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data) {
        dispatch(GET_CATEGORIES_EMAIL(UrlPath));
        toast.success('Subfolder Deleted successfully!', toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const GET_SCHEDULE_MAILS = (UrlPath, folderId) => {
  let url = `${UrlPath}/list_template/${getUserId()}/${folderId}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_SCHEDULE_MAILS',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const DELETE_SCHEDULE_MAIL = (urlpath, templateId) => {
  let url = `${urlpath}/remove_template/${getUserId()}/${templateId}`;
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data.success) {
        toast.success(response.data.msg.replace(/\\/g, ''), toastCSS());
        dispatch({
          type: 'REMOVE_SCHEDULE_MAILS',
          payload: templateId
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_EMAIL_CATEGORY = (urlpath, folderId, folderName, type) => {
  let uriName;
  let payload = {};
  if (type === 'main') {
    uriName = 'edit_category';
    payload.categoryName = folderName;
  } else {
    uriName = 'update_folder';
    payload.folderName = folderName;
  }
  let url = `${urlpath}/${uriName}/${getUserId()}/${folderId}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success('folder updated successfully!', toastCSS());
      }
      dispatch(GET_CATEGORIES_EMAIL(urlpath));
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_ALL_SMART_LIST = () => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/folder_list/${getUserId()}`;
  } else {
    url = `/api/smartlists/folder_list/${getUserId()}`;
  }
  url = `/api/smartlists/folder_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      dispatch({
        type: 'GET_ALL_SMART_LIST',
        payload: response?.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_SMART_LIST = (payload, id) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/update_smartlist/${getUserId()}/${id}`;
  } else {
    url = `/api/smartlists/update_smartlist/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data && response?.data?.success) {
        toast.success('Smart list updated successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};

export const DELETE_SMART_LIST = (id) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/delete_smartlist/${getUserId()}/${id}`;
  } else {
    url = `/api/smartlists/delete_smartlist/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data) {
        toast.success('Smart list deleted successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_SMART_LIST_FOLDER = (payload, id) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/update_Folder/${getUserId()}/${id}`;
  } else {
    url = `/api/smartlists/update_Folder/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data && response?.data?.success) {
        toast.success('Smart list updated successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};

export const DELETE_SMART_LIST_FOLDER = (id) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/delete_Folder/${getUserId()}/${id}`;
  } else {
    url = `/api/smartlists/delete_Folder/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data) {
        toast.success('Smart list deleted successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const CREATE_SMART_LIST_FOLDER = (payload) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/createFolder/${getUserId()}`;
  } else {
    url = `/api/smartlists/createFolder/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.post(url, payload, {
        headers: getHeaders()
      });
      if (res.data?.success) {
        toast.success('Smart list created successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
        return true;
      } else {
        toast.error(res?.error?.replace(/\\/g, ''), toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error?.error?.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};
export const CREATE_SMAART_LIST = (payload, folderId) => {
  let url = '';
  if (userData.role === 'admin') {
    url = `/api/admin/smartlists/create_smartlist/${getUserId()}/${folderId}`;
  } else {
    url = `/api/smartlists/create_smartlist/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.post(url, payload, {
        headers: getHeaders()
      });
      if (res.data?.success) {
        toast.success('Smart list created successfully!', toastCSS());
        dispatch(GET_ALL_SMART_LIST());
        return true;
      } else {
        toast.error(res?.data?.msg.replace(/\\/g, ''), toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error.error.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};
// criteria_met
export const ADD_CRITERIA_MET = (urlPath, data) => {
  let url = `/api/criteria_met/email_compose/add_template/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL(urlPath));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_SMARTLIST_ID = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_SMARTLIST_ID',
      payload: data
    });
  };
};
export const UPLAODE_IMAGE = (data) => {
  let url = `/api/email/eventManager`;
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeadersForFile() });
      if (response.data && response.status === 200) {
        toast.success(response.data.msg, toastCSS());
        return response.data;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
