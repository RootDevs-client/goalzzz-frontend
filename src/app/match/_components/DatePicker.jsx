'use client';

import { useAppContext } from '@/contexts/XoomAppContent';
import getDateRange from '@/lib/helpers/getDateRange';
import 'flatpickr/dist/themes/dark.css';
import Flatpickr from 'react-flatpickr';
import { AiOutlineCalendar } from 'react-icons/ai';
import FormattedDate from './FormattedDate';

export default function DatePicker() {
  const {
    checkLive,
    setCheckLive,
    setSelectedDate,
    selectedDate,
    setIsRefetching,
  } = useAppContext();

  const dateRange = getDateRange(selectedDate);

  const handleCheckLive = () => {
    setCheckLive(!checkLive);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary h-20 w-full -skew-y-[0.5deg] relative">
        <div
          onClick={() => handleCheckLive()}
          className={` ${
            !checkLive ? 'bg-white text-secondary' : 'text-white bg-secondary'
          } z-30 w-fit ml-10 px-2 absolute -top-2 left-5 font-bold  uppercase shadow-md shadow-rose-600 cursor-pointer`}
        >
          <span className="animate-pulse">Live</span>
        </div>
        <div className="skew-y-[0.5deg] grid grid-cols-12 h-full p-2 mt-2">
          <div className="col-span-11 flex items-center justify-between px-2">
            {dateRange.map((date, index) => (
              <FormattedDate key={index} date={date} />
            ))}
          </div>

          <div className="col-span-1 flex items-center justify-center relative">
            <AiOutlineCalendar className="text-xl text-white absolute top-5" />

            <Flatpickr
              className="w-6 h-6 opacity-0 absolute top-5 cursor-pointer"
              value={selectedDate}
              options={{
                onChange: function (selectedDates, dateStr) {
                  setSelectedDate(dateStr);
                  setIsRefetching(true);
                },
                disableMobile: 'true',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
