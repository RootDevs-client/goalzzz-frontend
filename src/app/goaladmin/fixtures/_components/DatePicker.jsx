import getDay from '@/lib/helpers/getDay';
import getIsToday from '@/lib/helpers/getIsToday';
import getMonth from '@/lib/helpers/getMonth';
import 'flatpickr/dist/themes/dark.css';
import React from 'react';
import Flatpickr from 'react-flatpickr';

function DatePicker({ dates, handleDate }, flatpickrRef) {
  return (
    <div className="grid grid-cols-1 gap-6 pt-5">
      <div className="panel">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Pick Your Date
          </h5>
        </div>
        <div className="mb-5 flex items-center justify-center overflow-x-scroll md:overflow-x-auto">
          <div className="m-auto flex w-9/12 justify-center border-b-[2px] border-dashed border-[#eaeaea] pb-5">
            {dates.map((item, index) => (
              <div
                onClick={() => handleDate(item)}
                key={index}
                className=" flex justify-center items-center"
              >
                <div
                  className={`ml-2 min-w-[5rem] cursor-pointer rounded-full px-4 py-1 ${
                    index == 3
                      ? 'bg-[#4461ef] font-bold text-[#FFFFFF]'
                      : 'bg-[#EAEAEA] font-medium text-[#9E9494]'
                  }`}
                >
                  <div>
                    <span className="block text-center text-sm">
                      {getIsToday(item) ? 'TODAY' : getDay(item)}
                    </span>
                    <span className="m-0 block text-center">
                      {item.slice(8, 10)} {getMonth(item)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="ml-2 flex min-w-[5rem] cursor-pointer items-center justify-center rounded-full bg-[#888888]">
              <Flatpickr
                ref={flatpickrRef}
                render={({ defaultValue, value, ...props }, ref) => (
                  <img
                    src="/images/calendar.png"
                    alt="logo"
                    ref={ref}
                    {...props}
                    className="h-6 w-6 cursor-pointer"
                  />
                )}
                options={{
                  onChange: function (selectedDates, dateStr) {
                    handleDate(dateStr);
                  },
                  disableMobile: 'true',
                }}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const forwardedDatePicker = React.forwardRef(DatePicker);

export default forwardedDatePicker;
