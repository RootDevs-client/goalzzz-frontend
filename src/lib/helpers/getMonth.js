export default function getMonth(date) {
  var newDate = new Date(date);
  return newDate.toLocaleString('en-US', { month: 'short' });
}
