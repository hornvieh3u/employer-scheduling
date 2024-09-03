import { history } from "./history"
import "firebase/auth"
import "firebase/database"
import axios from "axios"
import { toast } from "react-toastify"
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

const getHeadersForFile = () => {
  return {
    'content-type': 'multipart/form-data'
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
export const loginWithJWT = (user) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/api/signin`, {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        var loggedInUser;
        if (response.data) {
          loggedInUser = response.data.user;
          dispatch({
            type: 'LOGIN_WITH_JWT',
            payload: { loggedInUser, loggedInWith: 'jwt' }
          });

          history.push('/app/student/list');
        }
      })
      .catch((err) => {});
  };
};

export const LOGIN_WITH_JWT = ({ username, password }) => {
  return async (dispatch) => {
    try {
      let response = await API.post(`${baseUrl}/api/signin`, {
        username,
        password
      });
      if (response.data && response.status === 200) {
        let loggedInUser = response.data;
        if (response.data.hasOwnProperty('error')) {
          let errorMsg = response.data.error;
          dispatch({
            type: 'LOGIN_WITH_JWT_FAILED',
            payload: { error: errorMsg }
          });
        } else {
          if (!response?.data?.success) {
            toast.error(response?.data?.msg, toastCSS());
          } else {
            if (response.data.token.length > 0) {
              localStorage.setItem('user_id', response.data.data._id);
              localStorage.setItem('access_token', response.data.token);
              localStorage.setItem('userdata', JSON.stringify(response.data));
              localStorage.setItem(
                'firstLoginLocation',
                JSON.stringify(response.data?.data?.default_locationData || [])
              );
              dispatch({
                type: 'LOGIN_WITH_JWT',
                payload: { loggedInUser, loggedInWith: 'jwt' }
              });
              window.location.href =
                loggedInUser.role === 1
                  ? '/app/member/list'
                  : response.data?.data?.role === 0
                  ? '/dashboard'
                  : '/admin/dashboard';
            }
          }
        }
      }
    } catch (error) {
      let errorMsg = error?.response?.data?.error;
      if (errorMsg) {
        dispatch({
          type: 'LOGIN_WITH_JWT_FAILED',
          payload: { error: errorMsg }
        });
      }
    }
  };
};
export const LOGING_MULTIPLE_LOCATION = (payload) => {
  return async (dispatch) => {
    try {
      let response = await API.post(`${baseUrl}/api/signin`, payload);
      if (response.data && response.status === 200 && response.data.success) {
        let loggedInUser = response.data;
        if (response.data.hasOwnProperty('error')) {
          let errorMsg = response.data.error;
          dispatch({
            type: 'LOGING_MULTIPLE_LOCATION',
            payload: { error: errorMsg }
          });
        } else {
          if (response?.data?.token?.length > 0) {
            localStorage.setItem('user_id', response.data.data?._id);
            localStorage.setItem('access_token', response.data.token);
            localStorage.setItem('userdata', JSON.stringify(response.data));
            dispatch({
              type: 'LOGIN_WITH_JWT',
              payload: { loggedInUser, loggedInWith: 'jwt' }
            });
            window.location.href =
              loggedInUser.role === 1
                ? '/app/member/list'
                : response.data?.data?.role === 0
                ? '/dashboard'
                : '/admin/schools';
          }
        }
      } else {
        toast.info(response.data.msg, toastCSS());
      }
    } catch (error) {
      let errorMsg = error?.response?.data?.error;
      if (errorMsg) {
        dispatch({
          type: 'LOGING_MULTIPLE_LOCATION',
          payload: { error: errorMsg }
        });
      }
    }
  };
};
export const logoutWithJWT = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT_WITH_JWT', payload: {} });
    history.push('/pages/login');
  };
};

export const logoutWithFirebase = (user) => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_WITH_FIREBASE', payload: {} });
    history.push('/pages/login');
  };
};

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: 'CHANGE_ROLE', userRole: role });
};

// eslint-disable-next-line camelcase
export const Get_User_Info = () => {
  return async (dispatch) => {
    try {
      let response = await API.get(`${baseUrl}/api/organization_setup_info/${getUserId()}`, {
        headers: {}
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'Get_User_Info',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

export const updateUserInfo = (payload) => {
  delete payload.memberProfileUrl;
  delete payload.showPassWord;
  let formData = new FormData();
  let dataEntries = Object.entries(payload);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = `${baseUrl}/api/user/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.put(url, formData, {
        headers: getHeadersForFile()
      });
      dispatch(Get_User_Info());
      toast.success(res.data.msg, toastCSS());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const UPDATE_RATING_FOR_SCHOOL = () => {
  let urlRating = `${baseUrl}/api/member/updateRating/${getUserId()}`;
  return async (dispatch) => {
    try {
      await API.get(urlRating, { headers: getHeaders() });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};

export const GET_USER_INFORMATION = () => {
  let url = `${baseUrl}/api/user/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await API.get(url, { headers: getHeaders() });
      if (res?.status) {
        dispatch({
          type: 'GET_USER_INFORMATION',
          payload: res.data
        });
      } else {
        toast.info(res?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCSS());
    }
  };
};
