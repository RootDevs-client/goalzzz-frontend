import moment from 'moment';
import { useEffect, useState } from 'react';

function Countdown({ date }) {
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(null);

  useEffect(() => {
    let loaderInterval;

    if (loader) {
      loaderInterval = setInterval(() => {
        setLoader(false);
      }, 2000);
    }

    const countDownDate = new Date(moment(date * 1000)).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCount(null);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0) {
          setCount(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else if (hours > 0) {
          setCount(`${hours}h ${minutes}m ${seconds}s`);
        } else if (minutes > 0) {
          setCount(`${minutes}m ${seconds}s`);
        } else {
          setCount(`${seconds}s`);
        }
      }
    }, 1000);

    // Clearing the intervals
    return () => {
      clearInterval(interval);
      clearInterval(loaderInterval);
    };
  }, [date, loader]);

  return (
    <div className="text-sm font-medium text-end">
      {count !== null ? (
        count
      ) : (
        <span className="text-red-500 animate-pulse">LIVE</span>
      )}
    </div>
  );
}

export default Countdown;
