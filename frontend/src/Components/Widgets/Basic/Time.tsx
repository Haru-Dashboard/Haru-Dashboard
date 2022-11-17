import React, { useState, useEffect } from 'react';

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="datetime w-25 ps-4 text-white">
      <span className="date fs-6">
        {time.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </span>
      <br />
      <span className="fs-2 fw-bolder me-1">
        {
          time
            .toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .split(' ')[0]
        }
      </span>
      <span className="fs-6 fw-bolder">
        {
          // Note AM or PM
          time
            .toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .split(' ')[1]
        }
      </span>
    </div>
  );
};

export default Time;
