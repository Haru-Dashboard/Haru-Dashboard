export type WeatherData = {
  main: { temp: number };
  weather: { icon: string }[];
  time: string;
};
