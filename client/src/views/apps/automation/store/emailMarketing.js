let initState = {
  categoriesEmail: null,
  allScheduleMails: [],
  smartlist: null,
  selectedSmartList: [],
  selectedtemplist: [],
  allSentEmails: null,
  allScheduleEmails: [],
  emailVerificationError: null,
  emailVerificationResponse: null,
  listOfActiveOrInActiveEmails: null,
  getAllSmartList: null,
  getAllSmartlistId: [],
  getAllAdminCategoris: []
};
export const EmailMarketing = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_EMAIL':
      return { ...state, categoriesEmail: action.payload };
    case 'GET_SCHEDULE_MAILS':
      return { ...state, allScheduleMails: action.payload };
    case 'GET_SMARTLIST':
      return { ...state, smartlist: action.payload };
    case 'GET_SENT_EMAILS':
      return { ...state, allSentEmails: action.payload };
    case 'GET_ALL_SECHEDULE_EMAIL':
      return { ...state, allScheduleEmails: action.payload };
    case 'GET_ACTIVE_OR_INACTIVE_LIST':
      return { ...state, listOfActiveOrInActiveEmails: action.payload };
    case 'VERIFY_NEW_EMAIL_ADDRESS_RESPONSE':
      return { ...state, emailVerificationResponse: action.payload };
    case 'VERIFY_NEW_EMAIL_ADDRESS_ERROR':
      let errors = {};
      for (let err of action.payload) {
        errors[err.field] = err.message;
      }
      return { ...state, emailVerificationError: errors };
    case 'REMOVE_SCHEDULE_MAILS':
      const afterdelete = state.allScheduleMails.data?.template.filter(
        (template) => template._id !== action.payload
      );
      return { ...state, allScheduleMails: { template: afterdelete } };
    case 'GET_ALL_SMART_LIST':
      return { ...state, getAllSmartList: action.payload };
    case 'GET_SMARTLIST_ID':
      return { ...state, getAllSmartlistId: action.payload };
    default:
      return state;
  }
};
