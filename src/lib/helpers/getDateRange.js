// export default function getDateRange(date = new Date()) {
//   const startDate = new Date(date);
//   startDate.setDate(startDate.getDate() - 4);

//   const endDate = new Date(date);
//   endDate.setDate(endDate.getDate() + 4);

//   const dateRangeArr = getDaysArray(startDate, endDate);

//   return dateRangeArr.map((date) => date.toISOString().slice(0, 10));
// }

// const getDaysArray = (start, end) => {
//   const dayList = [];
//   for (
//     let current = new Date(start);
//     current <= new Date(end);
//     current.setDate(current.getDate() + 1)
//   ) {
//     dayList.push(new Date(current));
//   }
//   return dayList;
// };

export default function getDateRange(initialDate = null) {
  const currentDate = initialDate ? new Date(initialDate) : new Date();

  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 3);

  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 3);

  const dayList = getDaysArray(startDate, endDate);
  const formattedDateRange = dayList.map((date) => formatDate(date));

  return formattedDateRange;
}

const getDaysArray = (startDate, endDate) => {
  const daysArray = [];
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    daysArray.push(new Date(currentDate));
  }
  return daysArray;
};

const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
};
