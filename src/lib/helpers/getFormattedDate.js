export function formatDateToDOWDDMON(inputDate) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const date = new Date(inputDate);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  return `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')} ${month}`;
}

export function convertDateToCustomFormat(inputDate) {
  const today = new Date();
  const input = new Date(inputDate);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  if (input.toDateString() === today.toDateString()) {
    return `TODAY ${today.getDate().toString().padStart(2, '0')} ${
      months[today.getMonth()]
    }`;
  } else {
    return formatDateToDOWDDMON(input);
  }
}
