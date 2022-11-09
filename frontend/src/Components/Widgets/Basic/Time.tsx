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
    <div className="datetime w-25 d-flex flex-column justify-content-end">
      <div className="date fs-6">
        {time.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className="time fs-4 fw-bolder">
        {`${
          time
            .toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .split(' ')[0]
        } ${
          // Note AM or PM
          time
            .toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            .split(' ')[1]
        }`}
      </div>
    </div>
  );
};

export default Time;
