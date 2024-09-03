import axios from "axios"
import { toast } from "react-toastify"
import { IS_MEMBERSHIP_PAYMENT_DONE } from "./shop"
import { customInterIceptors } from '../../../../lib/AxiosProvider'
const baseUrl = ''
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

const toastCss = () => {
  return {
    position: 'top-center',
    autoClose: 2000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
};

export const GET_NOTES_BY_MEMBERID = (NoteType, filterBy, pageNo, perPage) => {
  let url = `${baseUrl}/api/followup_note/${NoteType}/${filterBy}/${getUserId()}/${pageNo}/${perPage}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_NOTES_BY_MEMBERID',
        payload: res.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_INVOICE_LIST_BY_MEMBERID = (studentId) => {
  // let studentId = window.location.pathname.split("student-info/")[1]
  let url = `${baseUrl}/api/member/invoice_listing/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_INVOICE_LIST_BY_MEMBERID',
        payload: res.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_MEMBER_PURCHASED_INFO_OF_STUDENT = (purchasedMemberId) => {
  let url = `${baseUrl}/api/membership/buy_membership_info_BymemberShipId/${getUserId()}/${purchasedMemberId}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_MEMBER_PURCHASED_INFO_OF_STUDENT',
        payload: res.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const CREATE_LEADS_TRACKING = (data) => {
  let url = '';
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/leads_tracking/create_leads/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/leads_tracking/create_leads/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_LEADS_TRACKING());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_LEADS_TRACKING = (data) => {
  let url = '';
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/leads_tracking/get_all_leads/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/leads_tracking/get_all_leads/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_LEADS_TRACKING',
        payload: res.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const DELETE_LEAD_TRACKING = (leaidId) => {
  let url = '';
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/leads_tracking/delete_leads/${getUserId()}/${leaidId}`;
  } else {
    url = `${baseUrl}/api/leads_tracking/delete_leads/${getUserId()}/${leaidId}`;
  }

  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_LEADS_TRACKING());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const EDIT_LEADS_TRACKING = (data, leaidId) => {
  let url = '';
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/leads_tracking/update_leads/${localStorage.getItem(
      'user_id'
    )}/${leaidId}`;
  } else {
    url = `${baseUrl}/api/leads_tracking/update_leads/${localStorage.getItem(
      'user_id'
    )}/${leaidId}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.put(url, data, {
        headers: {
          'content-type': 'application/json'
        }
      });
      if (response.data && response.status === 200) {
        dispatch(GET_LEADS_TRACKING());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_ACTIVE_STUDENT_INFO = (studentId) => {
  // let studentId = window.location.pathname.split("student-info/")[1]
  let url = `${baseUrl}/api/member/member_info/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      if (res?.data?.success) {
        IS_MEMBERSHIP_PAYMENT_DONE(false);
        dispatch({
          type: 'GET_ACTIVE_STUDENT_INFO',
          payload: res.data?.data
        });
      } else {
        toast.error(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_STUDENT_INFO = (studentId) => {
  let url = `${baseUrl}/api/member/member_info/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      if (studentId !== undefined) {
        dispatch({ type: 'GET_STUDENT_INFO', payload: res.data });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      return;
    }
  };
};

export const GET_BIRTHDAY_BY_THIS_WEEK = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/birthday/birthday_this_week/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_THIS_WEEK',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_BIRTHDAY_BY_THIS_MONTH = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/dashboard/birthday_this_month/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_THIS_MONTH',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_BIRTHDAY_BY_NEXT_MONTH = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/dashboard/birthday_next_month/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_NEXT_MONTH',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_BIRTHDAY_BY_30_60_DAYS = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/birthday/thirty_to_sixty/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_30_60_DAYS',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_BIRTHDAY_BY_MORE_THAN_60_DAYS = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/birthday/more_than_sixty/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_MORE_THAN_60_DAYS',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_BIRTHDAY_BY_MORE_THEN_30 = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/birthday/more_than_thirty/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_BIRTHDAY_BY_MORE_THEN_30',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_ALL_MISS_CALL = () => {
  let url = `${baseUrl}/api/member/miss_you_call/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_ALL_MISS_CALL',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

//Miss You Call Api Integration
export const GET_MISS_YOU_CALL = (pageNumber, perrows, studentType, numberOfDates) => {
  let url = `${baseUrl}/api/missyouCall/all_data/${getUserId()}/${pageNumber}/${perrows}/${numberOfDates}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params: {
          studentType
        }
      });

      dispatch({
        type: 'GET_MISS_YOU_CALL',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

// Renewal Api Integration
export const GET_RENEWAL_ALL_DATA = (pagenumber, perrows, studentType, numberOfDates) => {
  let url = `${baseUrl}/api/renewal/expire_membership_std_all_data/${getUserId()}/${pagenumber}/${perrows}/${numberOfDates}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params: {
          studentType
        }
      });
      if (res.data.success) {
        dispatch({
          type: 'GET_RENEWAL_ALL_DATA',
          payload: res.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

// BirthDay Api Integration
export const GET_BIRTHDAY_ALL_DATA = (pagenumber, perrows, studentType, numberOfDates) => {
  let url = `${baseUrl}/api/dashboard/birthday_all_data/${getUserId()}/${pagenumber}/${perrows}/${numberOfDates}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params: {
          studentType
        }
      });
      if (res?.data?.success) {
        dispatch({
          type: 'GET_BIRTHDAY_ALL_DATA',
          payload: res.data
        });
      }
      // else {
      //   let Data = []
      //   dispatch({
      //     type: "GET_BIRTHDAY_ALL_DATA",
      //     payload: Data,
      //   })
      // }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

// GET_7TO14_MISS_CALL
export const GET_7TO14_MISS_CALL = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/missyouCall/seven_to_fourteen_miss/${getUserId()}/${pageNumber}/${perrows}`;

  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });

      dispatch({
        type: 'GET_7TO14_MISS_CALL',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
// GET_15TO13_MISS_CALL
export const GET_15TO30_MISS_CALL = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/missyouCall/fifteen_to_thirty_miss/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });

      dispatch({
        type: 'GET_15TO30_MISS_CALL',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
// GET_MORE_30_MISS_CALL
export const GET_MORE_30_MISS_CALL = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/missyouCall/thirty_to_sixty/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_MORE_30_MISS_CALL',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_MISS_CALL_MORETHEN60 = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/missyouCall/more_than_sixty/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_MISS_CALL_MORETHEN60',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const GET_MISS_CALL_MORETHEN14 = (pageNumber, perrows, params) => {
  let url = `${baseUrl}/api/missYouCall/more_than_forteen/${getUserId()}/${pageNumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders(),
        params
      });
      dispatch({
        type: 'GET_MISS_CALL_MORETHEN14',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_ALL_TYPE_STUDENT = () => {
  let url = `${baseUrl}/api/member/member_list_name/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_ALL_TYPE_STUDENT',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_COUNT_OF_STUDENT_BY_TYPE = () => {
  let url = `${baseUrl}/api/memeber/std_count/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_COUNT_OF_STUDENT_BY_TYPE',
        payload: res.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_ALL_ELIGIBLE_STUDENT_LIST = () => {
  let url = `${baseUrl}/api/member/get_students_by_Active_Status/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ALL_ELIGIBLE_STUDENT_LIST',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      dispatch({
        type: 'GET_ALL_ELIGIBLE_STUDENT_LIST',
        payload: []
      });
    }
  };
};
export const GET_FROZEN_LIST_MEMBERSHIP = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/renewal/frozen_membership/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders(), params });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_FROZEN_LIST_MEMBERSHIP',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      dispatch({
        type: 'GET_FROZEN_LIST_MEMBERSHIP',
        payload: []
      });
    }
  };
};
export const GET_MEMBERSHIP_EXPIRD30DAYS = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/renewal/expire_membership_std_less_thirty/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders(), params });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MEMBERSHIP_EXPIRD30DAYS',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      dispatch({
        type: 'GET_MEMBERSHIP_EXPIRD30DAYS',
        payload: []
      });
    }
  };
};

export const GET_MEMBERSHIP_EXPIRD60DAYS = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/renewal/expire_membership_std_less_sixty/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders(), params });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MEMBERSHIP_EXPIRD60DAYS',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      dispatch({
        type: 'GET_MEMBERSHIP_EXPIRD60DAYS',
        payload: []
      });
    }
  };
};

export const GET_MEMBERSHIP_EXPIRD90DAYS = (pagenumber, perrows, params) => {
  let url = `${baseUrl}/api/renewal/expire_membership_std_less_ninty/${getUserId()}/${pagenumber}/${perrows}`;
  return async (dispatch) => {
    try {
      let response = await API.get(url, { headers: getHeaders(), params });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MEMBERSHIP_EXPIRD90DAYS',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
      dispatch({
        type: 'GET_MEMBERSHIP_EXPIRD90DAYS',
        payload: []
      });
    }
  };
};

export const GET_AFTER_CAMPS = (data) => {
  let url = '';
  if (userData?.role === 'admin') {
    url = `${baseUrl}/api/admin/after_camp/get_all_after_camp/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/after_camp/get_all_after_camp/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let res = await API.get(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'GET_AFTER_CAMPS',
        payload: res.data?.data
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const CREATE_AFTER_CAMP = (data) => {
  let url = '';
  if (userData?.role === 'admin') {
    url = `${baseUrl}/api/admin/after_camp/create_after_camp/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/after_camp/create_after_camp/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.post(url, data, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_AFTER_CAMPS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const DELETE_AFTER_CAMP = (leaidId) => {
  let url = '';
  if (userData?.role === 'admin') {
    url = `${baseUrl}/api/admin/after_camp/delete_after_camp/${getUserId()}/${leaidId}`;
  } else {
    url = `${baseUrl}/api/after_camp/delete_after_camp/${getUserId()}/${leaidId}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.delete(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_AFTER_CAMPS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
export const EDIT_AFTER_CAMP = (data, leaidId) => {
  let url = '';
  if (userData?.role === 'admin') {
    url = `${baseUrl}/api/admin/after_camp/update_after_camp/${localStorage.getItem(
      'user_id'
    )}/${leaidId}`;
  } else {
    url = `${baseUrl}/api/after_camp/update_after_camp/${localStorage.getItem(
      'user_id'
    )}/${leaidId}`;
  }
  return async (dispatch) => {
    try {
      let response = await API.put(url, data, {
        headers: {
          'content-type': 'application/json'
        }
      });
      if (response.status === 200) {
        dispatch(GET_AFTER_CAMPS());
        toast.success('Tags updated successfully', toastCss());
      } else {
        toast.info(response?.msg);
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
