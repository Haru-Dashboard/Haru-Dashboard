import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../../../API/Weather';
import { isWithinHour } from '../../../Utils';
import { WeatherData } from '../../../Utils/Weather';

const Weather = () => {
  const [temperature, setTemperature] = useState<number>();
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    let flag = true;
    const tmpWeatherData = localStorage.getItem('weatherData');
    if (tmpWeatherData) {
      const weatherData: WeatherData = JSON.parse(tmpWeatherData);
      if (isWithinHour(weatherData.time)) {
        flag = false;
        setTemperature(weatherData.main.temp);
        setIcon(weatherData.weather[0].icon);
      }
    }
    if (flag) {
      getCoords()
        .then(fetchWeather)
        .then((weatherData) => {
          setTemperature(weatherData.main.temp);
          setIcon(weatherData.weather[0].icon);
        });
    }
  }, []);

  function getCoords(): Promise<GeolocationCoordinates> {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => {
          reject(error);
        },
      );
    });
  }

  return (
    <>
      {icon !== undefined && temperature !== undefined ? (
        <div className="weather select-none d-flex align-items-center text-white">
          <img
            className="weather-img"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="weather icon"
          />
          {/* Note &#8451; is a Unicode for DEGREE CELSIUS */}
          <span className="temperature">{temperature?.toFixed(1)}&#8451;</span>
        </div>
      ) : (
        <span style={{ width: '0px' }}></span>
      )}
    </>
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
