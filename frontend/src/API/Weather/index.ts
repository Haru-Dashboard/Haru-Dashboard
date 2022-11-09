const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export function getWeather(
  coords: GeolocationCoordinates,
): Promise<weatherData> {
  return new Promise(function (resolve, reject) {
    const { latitude, longitude } = coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((data: weatherData) => resolve(data));
  });
}

export type weatherData = {
  main: { temp: number };
  weather: { icon: string }[];
};
