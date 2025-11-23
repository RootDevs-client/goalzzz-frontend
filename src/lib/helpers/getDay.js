export default function getDay(date) {
  var newDate = new Date(date);
  return newDate.toString().split(' ')[0];
}
