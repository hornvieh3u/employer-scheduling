import axios from "axios"
import { toast } from "react-toastify"
import { getIncomeReportFilterAction } from "./mymoney"
import { customInterIceptors } from '../../../../lib/AxiosProvider'
const baseUrl = process.env.REACT_APP_API.replace('/api/', '')



const userData = JSON.parse(localStorage.getItem('userData'));
const getUserId = () => {
  return userData.id;
};
const API = customInterIceptors();
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
const getHeaders = () => {
  return {
    'content-type': 'application/json'
  };
};
const getHeadersForFile = () => {
  return {
    'content-type': 'multipart/form-data'
  };
};
export const GET_MEMBERSHIP_LIST = () => {
  let url = `${baseUrl}/api/membership/membership_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_MEMBERSHIP_LIST',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const CREATE_MEMBERSHIP = (payload, folderId) => {
  let formData = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/add_membership/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/admin/membership/add_membership/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.post(url, formData, {
        headers: getHeadersForFile()
      });
      if (res.data.success) {
        toast.success(res.data.msg, toastCSS());
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
      } else {
        toast.info(res.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const EDIT_MEMBERSHIP = (data, studentId) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/update_membership/${getUserId()}/${studentId}`;
  } else {
    url = `${baseUrl}/api/admin/membership/update_membership/${getUserId()}/${studentId}`;
  }
  let formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return async (dispatch) => {
    try {
      let res = await API.put(url, formData, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
        toast.success(`Membership Updated successfully!`.replace(/\\/g, ''), toastCSS());
      } else {
        toast.info(res.data.msg.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

// ****************admin membership ************************
export const GET_ADMIN_MEMBERSHIP_LIST = () => {
  let url = `${baseUrl}/api/admin/membership/membership_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_ADMIN_MEMBERSHIP_LIST',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const EDIT_ADMIN_MEMBERSHIP = (data, studentId) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/admin/membership/update_membership/${getUserId()}/${studentId}`;
    try {
      let res = await API.put(url, data, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        toast.success(`Membership Updated successfully!`.replace(/\\/g, ''), toastCSS());
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
      } else {
        toast.info(`Unable to update!`.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

// *******************end admin membership ****************************
export const EDIT_BOUGTH_MEMBERSHIP_OF_STUDENT = (data, studentId) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/membership/update_buy_memberships/${getUserId()}/${studentId}`;
    try {
      let res = await API.put(url, data, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        toast.success(`Membership Updated successfully!`.replace(/\\/g, ''), toastCSS());
        dispatch(GET_MEMBERSHIP_LIST());
      } else {
        toast.info(`Unable to update!`.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const IS_MEMBERSHIP_PAYMENT_DONE = (booleon) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'IS_MEMBERSHIP_PAYMENT_DONE',
        payload: booleon
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const BUY_MEMBERSHIP = (memberShipInfo, payload, StudentId, studentBuy = false) => {
  let url = `${baseUrl}/api/membership/buy_membership/${getUserId()}/${StudentId}`;

  if (payload?.financeId == '') {
    delete payload?.financeId;
  }
  return async (dispatch) => {
    try {
      let res = await API.post(url, payload, { headers: getHeaders() });
      if (res.data.success) {
        if (memberShipInfo?.membershipDoc?.length > 0) {
          let payload = { docUrl: memberShipInfo?.membershipDoc };
          // eslint-disable-next-line camelcase
          let buyMsid = res?.data?.data;
          let msId = memberShipInfo?._id;
          let urlMerge = `${baseUrl}/api/membership/mergeDoc/${getUserId()}/${StudentId}/${msId}/${buyMsid}`;
          let result = await API.post(urlMerge, payload, {
            headers: getHeaders()
          });
          // dispatch(IS_MEMBERSHIP_PAYMENT_DONE(true))
          dispatch({
            type: 'MERGE_DOCUMENT_OF_DOC_2_PDF',
            payload: { ...result?.data, Buy_MSId }
          });
          // toast.success(res.data.msg, toastCSS())
        }
        toast.success(res.data.msg, toastCSS());
        dispatch(IS_MEMBERSHIP_PAYMENT_DONE(true));
        if (studentBuy) {
          await dispatch(GET_STUDENT_PURCHASE_LIST());
        }
        return true;
      } else {
        toast.error(res.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};

export const BUY_MEMBERSHIP_WITH_STRIPE = (
  memberShipInfo,
  payload,
  StudentId,
  studentBuy = false
) => {
  let url = `${baseUrl}/api/membership/buy_membership_stripe/${getUserId()}/${StudentId}`;

  if (payload?.financeId === '') {
    delete payload?.financeId;
  }
  return async (dispatch) => {
    try {
      let res = await API.post(url, payload, { headers: getHeaders() });
      if (res.data.success) {
        if (memberShipInfo?.membershipDoc?.length > 0) {
          let payload = { docUrl: memberShipInfo?.membershipDoc };
          let buyMsid = res?.data?.data;
          let msId = memberShipInfo?._id;
          let urlMerge = `${baseUrl}/api/membership/mergeDoc/${getUserId()}/${StudentId}/${msId}/${buyMsid}`;
          let result = await API.post(urlMerge, payload, {
            headers: getHeaders()
          });
          dispatch({
            type: 'MERGE_DOCUMENT_OF_DOC_2_PDF',
            payload: { ...result?.data, Buy_MSId }
          });
        }

        toast.success(res.data.msg, toastCSS());
        dispatch(IS_MEMBERSHIP_PAYMENT_DONE(true));
        // if (studentBuy) {
        //   await dispatch(GET_STUDENT_PURCHASE_LIST())
        // }
        // return true
        return res.data;
      } else {
        toast.error(res.data.msg, toastCSS());
        dispatch(IS_MEMBERSHIP_PAYMENT_DONE(false));
        return false;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};

export const DeleteMembershipFromStudent = (membershipId) => {
  let url = `${baseUrl}/api/membership/delete_buy_membership/${getUserId()}/${membershipId}`;

  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      toast.info(response.data.msg.replace(/\\/g, ''), toastCSS());
      dispatch(GET_STUDENT_PURCHASE_LIST());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const getMembershipInfo = (membershipId) => {
  let url = `${baseUrl}/api/membership/info_membership/${getUserId()}/${membershipId}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_MEMBERSHIP_INFO',
        payload: response.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const CREATE_PRODUCT = (payload, folderid) => {
  let formData = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/product/create_product/${getUserId()}/${folderid}`;
  } else {
    url = `${baseUrl}/api/admin/product/add_product/${getUserId()}/${folderid}`;
  }

  return async (dispatch) => {
    try {
      let res = await API.post(url, formData, {
        headers: getHeadersForFile()
      });
      if (res.data?.success) {
        dispatch(GET_PRODECT_FOLDER());
        toast.success(res.data.msg, toastCSS());
      } else {
        toast.error(res.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_PRODUCT = (payload, id) => {
  let formData = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/product/update_product/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/product/update_product/${getUserId()}/${id}`;
  }

  return async (dispatch) => {
    try {
      let res = await API.put(url, formData, {
        headers: getHeadersForFile()
      });
      if (res.data.success) {
        toast.info(res.data?.msg, toastCSS());
        dispatch(GET_PRODECT_FOLDER());
      } else {
        toast.info(res.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const DELETE_PRODECT = (id) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/product/delete_product/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/product/delete_product/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.delete(url, {
        headers: getHeaders()
      });
      if (res.data.success) {
        dispatch(GET_PRODECT_FOLDER());
        toast.info(res.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const GET_PRODECT_FOLDER = () => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/getproductfolder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/product/folder_list/${getUserId()}`;
  }

  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data?.success) {
        dispatch({
          type: 'GET_PRODECT_FOLDER',
          payload: response.data?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const CREATE_PRODECT_FOLDER = (folderName) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/addproductfolder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/product/createFolder/${getUserId()}`;
  }

  return async (dispatch) => {
    try {
      let response = await API.post(url, folderName, {
        headers: getHeaders()
      });

      if (response.data.success) {
        toast.info(response.data.msg, toastCSS());
        dispatch(GET_PRODECT_FOLDER());
      } else {
        toast.info(response.data.msg, toastCSS());
      }
    } catch (e) {
      toast.error(e.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const UPDATE_PRODECT_FOLDER = (payload, id) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/updateproductFolder/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/product/update_Folder/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response?.data?.success) {
        toast.info(response.data?.msg.replace(/\\/g, ''), toastCSS());
        dispatch(GET_PRODECT_FOLDER());
      } else {
        toast.info(response?.data?.msg.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const DELETE_PRODECT_FOLDER = (folderId) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/deleteproductFolder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/admin/product/delete_Folder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data?.success) {
        toast.success(response.data.msg.replace(/\\/g, ''), toastCSS());
        dispatch(GET_PRODECT_FOLDER());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const GET_STUDENT_LIST = () => {
  return async (dispatch) => {
    try {
      let response = await API.get(
        `${baseUrl}/api/member/active_student/${localStorage.getItem('user_id')}`,
        {
          headers: getHeaders()
        }
      );
      if (response.data && response.status === 200) {
        toast.info(response.data?.msg, toastCSS());
        dispatch({
          type: 'GET_STUDENT_LIST',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_STUDENT_PURCHASE_LIST = () => {
  let studentId = window.location.pathname.split('student-info/')[1];
  let url = `${baseUrl}/api/member/member_info/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_STUDENT_PURCHASE_LIST',
          payload: response.data?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const MEMBERSHIP_ACTION = (payload, membershipId, type) => {
  let url = `${baseUrl}/api/membership/update_buy_memberships/${getUserId()}/${membershipId}/${type}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data.success) {
        if (response.data.msg.includes('Terminate')) {
          toast.info(response.data.msg, toastCSS());
        } else {
          toast.success(response.data.msg, toastCSS());
        }
        dispatch(GET_STUDENT_PURCHASE_LIST());
      } else {
        toast.error(response.data.error, toastCSS());
      }
    } catch (e) {
      toast.error(e.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const MEMBERSHIP_EMI_PAYMENT = (
  payload,
  membershipId,
  emiId,
  paymentSystem = false,
  month = false,
  year = false
) => {
  let url = `${baseUrl}/api/membership/update_buy_memberships_Payments/${getUserId()}/${membershipId}/${emiId}`;
  return async (dispatch) => {
    try {
      let response = await API.put(url, payload, { headers: getHeaders() });
      if (response.data.success) {
        toast.success(response.data.message, toastCSS());

        if (paymentSystem && month && year) {
          dispatch(getIncomeReportFilterAction(paymentSystem, month, year));
        } else {
          dispatch(GET_STUDENT_PURCHASE_LIST());
        }
      }
    } catch (e) {
      toast.error(e.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_MEMBERSHIP_FOLDER_LIST = () => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/folder_list/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/membership/folder_list/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data?.success) {
        dispatch({
          type: 'GET_MEMBERSHIP_FOLDER_LIST',
          payload: response.data?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const ADD_CREATE_MEMEBERSHIP_FOLDER = (payload) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/createFolder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/membership/createFolder/${getUserId()}`;
  }

  return async (dispatch) => {
    try {
      let response = await API.post(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        toast.success(response.data.msg.replace(/\\/g, ''), toastCSS());
        await dispatch(GET_MEMBERSHIP_FOLDER_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
export const EDIT_MEMBERSHIP_FOLDER = (data, folderId) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/update_Folder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/admin/membership/update_Folder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.put(url, data, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
        toast.success(res.data.msg.replace(/\\/g, ''), toastCSS());
      } else {
        toast.info(`Unable to update!`.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_MEMBERSHIP_FOLDER = (folderId) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/delete_Folder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/admin/membership/delete_Folder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data?.success) {
        toast.info(response.data.msg.replace(/\\/g, ''), toastCSS());
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
      } else {
        toast.error(response.msg.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.msg.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const DELETE_MEMBERSHIP = (id) => {
  let url = '';
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/membership/delete_membership/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/membership/delete_membership/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response?.data?.success) {
        toast.info(response.data.msg.replace(/\\/g, ''), toastCSS());
        dispatch(GET_MEMBERSHIP_FOLDER_LIST());
      } else {
        toast.error(response?.data?.msg.replace(/\\/g, ''), toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const HANDLE_IS_PAYMENT_DONE_FOR_MEMBERSHIP_BY = (preBollen) => {
  return (dispatch) => {
    dispatch({
      type: 'HANDLE_IS_PAYMENT_DONE_FOR_MEMBERSHIP_BY',
      payload: preBollen
    });
  };
};

export const BUY_PRODUCT = (studentId, data) => {
  if (
    data?.product_details?.ptype !== 'credit card' &&
    data?.product_details?.pay_latter !== 'credit card'
  ) {
    delete data?.product_details?.valorPayload;
    delete data?.product_details?.finance_id;
  }
  let url = `${baseUrl}/api/product/buy_product/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await API.post(url, data, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        // toast.success(res.data.msg.replace(/\\/g, ""), toastCSS())
        return true;
      } else {
        toast.info(`Unable to update!`.replace(/\\/g, ''), toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};

export const BUY_PRODUCT_STRIPE = (studentId, data) => {
  let url = `${baseUrl}/api/product_stripe/buy_product_stripe/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await API.post(url, data, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        toast.success(res.data.msg.replace(/\\/g, ''), toastCSS());
        return true;
      } else {
        toast.info(`Unable to update!`.replace(/\\/g, ''), toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
      return false;
    }
  };
};
