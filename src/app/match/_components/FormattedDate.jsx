import { useAppContext } from '@/contexts/XoomAppContent';

export default function FormattedDate({ date }) {
  const today = new Date();
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

  const { selectedDate, setSelectedDate, setIsRefetching } = useAppContext();
  const formattedDate = new Date(date);
  const dayOfWeek = daysOfWeek[formattedDate.getUTCDay()];
  const dayOfMonth = formattedDate.getUTCDate();
  const month = months[formattedDate.getUTCMonth()];

  const isToday = formattedDate.toDateString() === today.toDateString();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsRefetching(true);
  };

  return (
    <div onClick={() => handleDateClick(date)}>
      {isToday ? (
        <p
          className={`text-sm cursor-pointer min-w-[60px] ${
            date === selectedDate
              ? 'text-secondary font-bold '
              : 'text-gray-300'
          } text-center scale-105`}
        >
          TODAY
          <br />
          <span className="block text-[10px]">
            {`${dayOfMonth.toString().padStart(2, '0')} ${month}`}
          </span>
        </p>
      ) : (
        <p
          className={`text-sm cursor-pointer ${
            date === selectedDate
              ? 'text-secondary font-bold scale-105'
              : 'text-white '
          } text-center`}
        >
          {dayOfWeek}
          <br />
          <span className="block text-[10px]">
            {`${dayOfMonth.toString().padStart(2, '0')} ${month}`}
          </span>
        </p>
      )}
    </div>
  );
}
