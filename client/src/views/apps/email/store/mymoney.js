import axios from "axios"
import { toast } from "react-toastify"
const baseUrl = process.env.REACT_APP_API.replace('/api/', '')


const getUserId = () => {
  return localStorage.getItem('user_id');
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

export const GetExpenseList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/list_of_expenses/${localStorage.getItem('user_id')}`,
        {
          headers: getHeaders()
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_EXP_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};
export const CREATE_EXPENSE = (data) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/add_expenses/${localStorage.getItem('user_id')}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      );
      if (response.data && response.status === 200) {
        dispatch(GetExpenseList());
        toast.success(response?.data?.msg, toastCss());
      }
    } catch (error) {
      dispatch(GetExpenseList());
    }
  };
};

export const TRASH_EXPENSE = (id) => {
  let url = `${baseUrl}/api/delete_expenses/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      await axios.delete(url, {
        headers: getHeaders()
      });
      dispatch(GetExpenseList());
      toast.info('Deleted Successfully!', toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
/*************************************expense category ********************* */
export const ExpenseCategoryList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/api/expenses/list_category/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_EXP_CATEGORY_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

export const CREATE_EXPENSE_CATEGORY = (task) => {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl}/api/expenses/add_category/${getUserId()}`,
        { ...task },
        {
          headers: getHeaders()
        }
      )
      .then((res) => {
        dispatch(ExpenseCategoryList());
      });
  };
};
// export const editExpenseCategory  = (id, data) => {
//   return dispatch => {
//      axios.put(`${baseUrl}/api/expenses/update_category/${localStorage.getItem("user_id")}/${id}`, data, {
//       headers : {
//         "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
//         "content-type" : "application/json",
//       }
//     }).then(res => {
//       dispatch(ExpenseCategoryList())
//     })
//   }
// }
export const editExpenseCategory = (data, id) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/expenses/update_category/${getUserId()}/${id}`,
        data,
        {
          headers: getHeaders()
        }
      );
      if (response.data && response.status === 200) {
        dispatch(ExpenseCategoryList());
      }
    } catch (error) {}
  };
};

export const trashCategory = (id) => {
  return (dispatch) => {
    axios
      .delete(`${baseUrl}/api/expenses/remove_category/${getUserId()}/${id}`, {
        headers: {}
      })
      .then((res) => {
        dispatch(ExpenseCategoryList());
      });
  };
};

/**********************************finance mymoney********************************* */
export const GetMonthlyPaymentList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/api/finance/monthly_pay_list/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MONTHLY_PAYMENTS_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

export const ExpenseBreakDownList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/api/finance/expense_breakdown/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_EXPENSE_BREAKDOWN_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

export const CCExpiringList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/finance/cc_expire/${localStorage.getItem('user_id')}`,
        {
          headers: getHeaders()
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MONTHLY_CCExpiring',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

/**************************************************************marketing ************************** */

export const GetAllEmailList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/all_email_list/${localStorage.getItem('user_id')}`,
        {
          headers: getHeaders()
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ALL_EMAIL_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

export const SENT_EMAIL_COMPOSE = (task) => {
  return async (dispatch) => {
    let response = await axios.post(
      `${baseUrl}/api/email_compose/send_email/${localStorage.getItem('user_id')}`,
      { ...task },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
    if (response.data && response.status === 200) {
    } else {
    }
  };
};

export const moveMail = (id) => {
  return (dispatch) => {
    axios
      .delete(`${baseUrl}/api/email_compose/remove_template/${getUserId()}/${id}`, {
        headers: getHeaders()
      })
      .then((res) => {
        dispatch(GetAllEmailList());
      });
  };
};

export const CREATE_FOLDER_CATEGORY = (task) => {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl}/api/email_compose/addCategory/${getUserId()}`,
        { ...task },
        {
          headers: getHeaders()
        }
      )
      .then((res) => {
        dispatch(GetFolderList());
      });
  };
};
export const GetFolderList = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/api/email_compose/category_list/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_FOLDER_LIST',
          payload: response.data
        });
      }
    } catch (error) {}
  };
};

/// ------- @finance

//@fetch all CC with pagination
export const fetchAllCCAction = (page, perPage) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_ALL_CC_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/fetch-all-cc/${getUserId()}`, {
        params: {
          page,
          perPage
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ALL_CC_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_ALL_CC_ERROR' });
    }
  };
};

//@fetch Expense by Category
export const getExpenseByCategoryAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_EXPENSE_STATE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-state/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_EXPENSE_STATE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_EXPENSE_STATE_ERROR' });
    }
  };
};

//@fetch Expense Monthly Compare
export const getExpenseMonthlyComopareAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_MONTHLY_COMPARE_EXPENSE_LOADING' });

      let response = await axios.get(
        `${baseUrl}/api/finance/expense-monthly-compare/${getUserId()}`,
        {
          headers: getHeaders()
        }
      );

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MONTHLY_COMPARE_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_MONTHLY_COMPARE_EXPENSE_ERROR' });
    }
  };
};

//@fetch Expense Today
export const getTodaysExpenseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_TODAYS_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-today/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_TODAYS_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_TODAYS_EXPENSE_ERROR' });
    }
  };
};

//@fetch Expense Weekly
export const getWeeklyExpenseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_WEEKLY_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-weekly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_WEEKLY_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_WEEKLY_EXPENSE_ERROR' });
    }
  };
};

//@fetch Expense Monthly
export const getMonthlyExpenseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_MONTHLY_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-monthly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MONTHLY_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_MONTHLY_EXPENSE_ERROR' });
    }
  };
};

//@fetch Expense Yearly
export const getYearlyExpenseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_YEARLY_EXPENSE_LOADING' });
      let response = await axios.get(`${baseUrl}/api/finance/expense-yearly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_YEARLY_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_YEARLY_EXPENSE_ERROR' });
    }
  };
};

//@fetch Expense report with  filter
export const getExpenseReportFilterAction = (paymentSystem, month, year, page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_EXPENSE_FILTER_REPORT_LOADING' });
      let response = await axios.get(`${baseUrl}/api/finance/expense-report/${getUserId()}`, {
        params: {
          paymentSystem,
          month,
          year,
          page
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_EXPENSE_FILTER_REPORT_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_EXPENSE_FILTER_REPORT_ERROR' });
    }
  };
};

// Delete Expense
export const DeleteExpenseById = (id, paymentSystem, month, year, page) => {
  let url = `${baseUrl}/api/delete_expenses/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: 'EXPENSE_DELETE_LOADING'
      });
      await axios.delete(url, {
        headers: getHeaders()
      });
      dispatch({
        type: 'EXPENSE_DELETE_SUCCESS'
      });
      dispatch(getExpenseReportFilterAction(paymentSystem, month, year, page));
      dispatch(getExpenseByCategoryAction());
      dispatch(getExpenseMonthlyComopareAction());
      dispatch(getTodaysExpenseAction());
      dispatch(getWeeklyExpenseAction());
      dispatch(getMonthlyExpenseAction());
      dispatch(getYearlyExpenseAction());
      //
    } catch (error) {
      dispatch({
        type: 'EXPENSE_DELETE_ERROR'
      });
    }
  };
};

// Create Expense category
export const createExpenseCategoryAction = (task) => {
  return (dispatch) => {
    dispatch({
      type: 'EXPENSE_CATEGORY_ADD_LOADING'
    });
    axios
      .post(
        `${baseUrl}/api/expenses/add_category/${getUserId()}`,
        { ...task },
        {
          headers: getHeaders()
        }
      )
      .then((res) => {
        dispatch({
          type: 'EXPENSE_CATEGORY_ADD_SUCCESS'
        });
      })
      .catch((err) => {
        dispatch({
          type: 'EXPENSE_CATEGORY_ADD_ERROR'
        });
      });
  };
};

// @add Expense
export const addExpenseAction = (data, paymentSystem, month, year, page) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  return async (dispatch) => {
    try {
      dispatch({
        type: 'EXPENSE_ADD_LOADING'
      });
      let response = await axios.post(
        `${baseUrl}/api/finance/expense-add/${localStorage.getItem('user_id')}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: 'EXPENSE_ADD_SUCCESS'
        });

        dispatch(getExpenseReportFilterAction(paymentSystem, month, year, page));
        dispatch(getExpenseByCategoryAction());
        dispatch(getExpenseMonthlyComopareAction());
        dispatch(getTodaysExpenseAction());
        dispatch(getWeeklyExpenseAction());
        dispatch(getMonthlyExpenseAction());
        dispatch(getYearlyExpenseAction());

        toast.success(response?.data?.msg, toastCss());
      }
    } catch (error) {
      dispatch({
        type: 'EXPENSE_ADD_ERROR',
        payload: error.response.data.message
      });
    }
  };
};

// =====================================================================
// ========================  Income Actions =============================================

//@fetch Income Today
export const getTodaysIncomeAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_TODAYS_INCOME_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/income-today/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_TODAYS_INCOME_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_TODAYS_INCOME_ERROR' });
    }
  };
};

//@fetch Income Weekly
export const getWeeklyIncomeAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_WEEKLY_INCOME_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/income-weekly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_WEEKLY_INCOME_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_WEEKLY_INCOME_ERROR' });
    }
  };
};

//@fetch Income Monthly
export const getMonthlyIncomeAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_MONTHLY_INCOME_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/income-monthly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_MONTHLY_INCOME_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_MONTHLY_INCOME_ERROR' });
    }
  };
};

//@fetch Last Month Income
export const getLastMonthIncomeAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_LAST_MONTH_INCOME_LOADING' });

      let response = await axios.get(
        `${baseUrl}/api/finance/last-month/${localStorage.getItem('user_id')}`,
        {
          headers: getHeaders()
        }
      );

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_LAST_MONTH_INCOME_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_LAST_MONTH_INCOME_ERROR' });
    }
  };
};

//@fetch On Time And On Going Expense
export const onTimeExpenseRequest = (expenseType) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_ON_TIME_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-by-type/${getUserId()}`, {
        params: {
          type: expenseType
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ON_TIME_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_ON_TIME_EXPENSE_ERROR' });
    }
  };
};
//@fetch On Time And On Going Expense
export const onGoingExpenseReqeust = (expenseType) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_ON_GOING_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/expense-by-type/${getUserId()}`, {
        params: {
          type: expenseType
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_ON_GOING_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_ON_GOING_EXPENSE_ERROR' });
    }
  };
};

//@fetch Income Yearly
export const getYearlyIncomeAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_YEARLY_INCOME_LOADING' });
      let response = await axios.get(`${baseUrl}/api/finance/income-yearly/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_YEARLY_INCOME_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_YEARLY_INCOME_ERROR' });
    }
  };
};

//@fetch Income report with  filter
export const getIncomeReportFilterAction = (paymentSystem, month, year) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_INCOME_FILTER_REPORT_LOADING' });
      let response = await axios.get(`${baseUrl}/api/finance/income-report/${getUserId()}`, {
        params: {
          paymentSystem,
          month,
          year
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_INCOME_FILTER_REPORT_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_INCOME_FILTER_REPORT_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLExpenseAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_FILTER_REPORT_LOADING' });
      let response = await axios.get(`${baseUrl}/api/finance/pnl-expense-report/${getUserId()}`, {
        params: { ...payload },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_PNL_FILTER_REPORT_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_PNL_FILTER_REPORT_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLMembershipAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_FILTER_MEMBERSHIP_LOADING' });
      let { data } = await axios.get(
        `${baseUrl}/api/finance/pnl-membership-report/${getUserId()}`,
        {
          params: { ...payload },
          headers: getHeaders()
        }
      );

      dispatch({
        type: 'GET_PNL_FILTER_MEMBERSHIP_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'GET_PNL_FILTER_MEMBERSHIP_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLProductAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_FILTER_PRODUCT_SALE_LOADING' });
      let { data } = await axios.get(
        `${baseUrl}/api/finance/pnl-product-sale-report/${getUserId()}`,
        {
          params: { ...payload },
          headers: getHeaders()
        }
      );

      dispatch({
        type: 'GET_PNL_FILTER_PRODUCT_SALE_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'GET_PNL_FILTER_PRODUCT_SALE_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLRefundAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_FILTER_REFUND_LOADING' });
      let { data } = await axios.get(
        `${baseUrl}/api/finance/pnl-refund-membership-report/${getUserId()}`,
        {
          params: { ...payload },
          headers: getHeaders()
        }
      );

      dispatch({
        type: 'GET_PNL_FILTER_REFUND_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'GET_PNL_FILTER_REFUND_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLRecurringByCC = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_RECURRING_CC_LOADING' });
      let { data } = await axios.get(
        `${baseUrl}/api/finance/pnl-in-cc/${localStorage.getItem('user_id')}`,
        {
          params: { ...payload },
          headers: getHeaders()
        }
      );

      dispatch({
        type: 'GET_PNL_RECURRING_CC_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'GET_PNL_RECURRING_CC_ERROR' });
    }
  };
};

//@fetch ~ Filter data for P & L
export const filterDataForPNLRecurringByInHouse = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_PNL_RECURRING_IN_HOUSE_LOADING' });
      let { data } = await axios.get(
        `${baseUrl}/api/finance/pnl-in-house-recurring/${getUserId()}`,
        {
          params: { ...payload },
          headers: getHeaders()
        }
      );

      dispatch({
        type: 'GET_PNL_RECURRING_IN_HOUSE_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({ type: 'GET_PNL_RECURRING_IN_HOUSE_ERROR' });
    }
  };
};

// category Delete

//@fetch On Time And On Going Expense
export const deleteCategoryAction = ({ id }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'EXPENSE_CATEGORY_DELETE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/category-delete/${getUserId()}`, {
        params: {
          id
        },
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'EXPENSE_CATEGORY_DELETE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({
        type: 'EXPENSE_CATEGORY_DELETE_ERROR',
        payload: error?.response?.data?.message
      });
    }
  };
};

//@fetch On Time And On Going Expense
export const categoryUpdateAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'EXPENSE_CATEGORY_UPDATE_LOADING' });

      let response = await axios.post(
        `${baseUrl}/api/finance/category-update/${getUserId()}`,
        payload,
        {
          headers: getHeaders()
        }
      );

      if (response.data && response.status === 200) {
        dispatch({
          type: 'EXPENSE_CATEGORY_UPDATE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'EXPENSE_CATEGORY_UPDATE_ERROR' });
    }
  };
};

//@fetch Last Month Expense
export const getLastMonthExpenseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_LAST_MONTH_EXPENSE_LOADING' });

      let response = await axios.get(`${baseUrl}/api/finance/last-month-expense/${getUserId()}`, {
        headers: getHeaders()
      });

      if (response.data && response.status === 200) {
        dispatch({
          type: 'GET_LAST_MONTH_EXPENSE_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({ type: 'GET_LAST_MONTH_EXPENSE_ERROR' });
    }
  };
};

export const GET_EXPENSES_LIST_FOR_ADMIN = () => {
  let url = `${baseUrl}/api/admin/expenses/list_category/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders()
      });
      if (response.data.success) {
        dispatch({
          type: 'GET_EXPENSES_LIST_FOR_ADMIN',
          payload: response.data.data
        });
      }
    } catch (error) {}
  };
};

export const CREATE_EXPENSE_FOR_ADMIN = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/admin/expenses/add_category/${getUserId()}`,
        payload,
        {
          headers: getHeaders()
        }
      );
      if (response.data.success) {
        dispatch(GET_EXPENSES_LIST_FOR_ADMIN());
        toast.success(response?.data?.msg, toastCss());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      dispatch(GET_EXPENSES_LIST_FOR_ADMIN());
    }
  };
};
export const EDIT_EXPENSES_CATEGROY_FOR_ADMIN = (data, id) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/expenses/update_category/${getUserId()}/${id}`,
        data,
        {
          headers: getHeaders()
        }
      );
      if (response.data.success) {
        dispatch(GET_EXPENSES_LIST_FOR_ADMIN());
        toast.info(response?.data?.msg, toastCss());
      } else {
        toast.info(response.data.msg, toastCss());
      }
    } catch (error) {}
  };
};

export const DELETE_EXPANSES_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/expenses/remove_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders()
      });
      if (response.data.success) {
        dispatch(GET_EXPENSES_LIST_FOR_ADMIN());
        toast.info(response.data.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const ADD_INVOICE = (payload) => {
  let url = `${'https://d228-116-206-203-171.in.ngrok.io'}/api/finance/finance_invoice/${getUserId()}`;
  return async () => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders()
      });
      if (response.data.success) {
        toast.success(response?.data?.message, toastCss());
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};

export const GET_ALL_INVOICE = () => {
  let url = ` https://d228-116-206-203-171.in.ngrok.io/api/finance/finance_invoice/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders()
      });
      if (response.status === 200) {
        dispatch({
          type: 'GET_ALL_INVOICE',
          payload: response.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ''), toastCss());
    }
  };
};
