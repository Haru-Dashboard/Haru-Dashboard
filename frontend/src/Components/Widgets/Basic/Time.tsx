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
    <div className="datetime w-25">
      <span className="date fs-6">
        {time.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </span>
      <br />
      <span className="time fs-4 fw-bolder">
        {
          time
            .toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .split(' ')[0]
        }
      </span>
      &nbsp;
      <span className="time fs-6 fw-bold">
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
