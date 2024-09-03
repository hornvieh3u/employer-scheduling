import moment from 'moment';

export const DateFormatter = (date) => {
  if (date === null || date === undefined) return '';
  const _ = String(moment(date).format('L')).split('/');

  return `${_[2]}-${_[1]}-${_[0]}`;
};
