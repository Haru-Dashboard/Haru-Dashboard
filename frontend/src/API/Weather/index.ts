import { weatherData } from '../../Utils/Weather';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export function fetchWeather(
  coords: GeolocationCoordinates,
): Promise<weatherData> {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((res) => {
          throw new Error(res.message);
        });
      })
      .then((data) => {
        const weatherData: weatherData = {
          ...data,
          time: new Date().toString(),
        };
        localStorage.setItem('weatherData', JSON.stringify(weatherData));
        return resolve(weatherData);
      })
      .catch((message) => {
        console.error(message);
      });
  });
}
