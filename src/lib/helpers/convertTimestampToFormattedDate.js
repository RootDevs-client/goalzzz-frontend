import moment from 'moment';

export function convertTimestampToFormattedDate(timestamp) {
  const date = moment.unix(timestamp);
  const formattedDate = date.format('DD MMM HH:mm');

  return formattedDate;
}
