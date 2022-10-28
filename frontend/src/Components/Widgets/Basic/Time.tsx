import React, { useState, useEffect } from 'react';

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleString(['en-US']));

  useEffect(() => {
    const interval = setInterval(
      () => setTime(new Date().toLocaleString(['en-US'])),
      1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="time">{time}</div>;
};

export default Time;
