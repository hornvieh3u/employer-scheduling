//====================================================================
// **** What's in this file?
//====================================================================
// ** Checks if an object is empty (returns boolean)
// ** Returns K format from a number
// ** Converts HTML to string
// ** Checks if the passed date is today
// ** Format and return date in Humanize format
// ** Returns short month of passed date
// ** Return if user is logged in
// ** React Select Theme Colors
// ** Convert Full Name to ShortName
// ** Break Long string to muliple line
// ** Make Long string short with ... at the end (truncate)

//====================================================================

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: 'short', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: 'short', day: 'numeric' };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData');
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'admin') return '/';
  if (userRole === 'client') return '/access-control';
  return '/login';
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
});

// ** Convert Full Name to ShortName
export const formatToShortName = (fullName) => {
  const nameOrArr = fullName.split(' ');
  const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
  const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
  const firstLetter = firstPart[0].toUpperCase();
  const lastLetter = lastPart[0] ? lastPart[0].toUpperCase() : '';
  return firstLetter + ' ' + lastLetter;
};

// ** Break Long string to muliple line
export const textFold = (input, lineSize) => {
  const output = [];
  let outputCharCount = 0;
  let outputCharsInCurrentLine = 0;
  for (var i = 0; i < input.length; i++) {
    const inputChar = input[i];
    output[outputCharCount++] = inputChar;
    if (inputChar === '\n') {
      outputCharsInCurrentLine = 0;
    } else if (outputCharsInCurrentLine > lineSize - 2) {
      output[outputCharCount++] = '\n';
      outputCharsInCurrentLine = 0;
    } else {
      outputCharsInCurrentLine++;
    }
  }
  return output.join('');
};

// ** Make Long string short with ... at the end (truncate)
export const truncate = (str, l) => {
  let output = [];
  if (str.length > l) {
    output = str.substring(0, l - 1) + '...';
    return output;
  } else {
    return str;
  }
};

// Format File Size

export const humanFileSize = (bytes, si = true, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
};

export const dayOfWeekAsString = (dayIndex) => {
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex] || '';
};

export const monthAsString = (monthIndex) => {
  return (
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
    monthIndex
    ] || ''
  );
};

export const formatTime = (date) => {
  return date.getHours() + ':' + date.getMinutes();
};
