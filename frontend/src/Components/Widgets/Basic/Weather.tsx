import React, { useState, useEffect } from 'react';

const Weather = () => {
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [temperature, setTemperature] = useState(12.5);
  const [icon, setIcon] = useState('01d');

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
            setTemperature(data['main']['temp']);
            setIcon(data['weather'][0]['icon']);
          });
      },
      (error) => {},
    );
  };

  return (
    <div className="weather">
      <img
        src={`http://openweathermap.org/img/w/${icon}.png`}
        alt="weather icon"
      />
      {/* Note &#8451; is a Unicode for DEGREE CELSIUS */}
      <span>{temperature}&#8451;</span>
    </div>
  );
};

export default Weather;

/*
Note Schema of weather data provided by OpenWeatherMap
{
  "coord": {
      "lon": 127.7669,
      "lat": 35.9078
  },
  "weather": [
      {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
      }
  ],
  "base": "stations",
  "main": {
      "temp": 10.4,
      "feels_like": 8.93,
      "temp_min": 10.4,
      "temp_max": 10.4,
      "pressure": 1025,
      "humidity": 55,
      "sea_level": 1025,
      "grnd_level": 957
  },
  "visibility": 10000,
  "wind": {
      "speed": 1.04,
      "deg": 103,
      "gust": 1.26
  },
  "clouds": {
      "all": 80
  },
  "dt": 1667180371,
  "sys": {
      "type": 1,
      "id": 5506,
      "country": "KR",
      "sunrise": 1667166583,
      "sunset": 1667205316
  },
  "timezone": 32400,
  "id": 1840942,
  "name": "Muju",
  "cod": 200
}
*/
