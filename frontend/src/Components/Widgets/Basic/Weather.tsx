import React, { useEffect } from 'react';

const Weather = () => {
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    // getWeather();
  }, []);

  const getWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return <div className="weather">Weather</div>;
};

export default Weather;
