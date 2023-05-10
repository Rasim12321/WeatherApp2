export interface Coordinates {
  lat: number;
  lon: number;
}

interface CityWeather {
  temp: number;
  main: string;
  icon: string;
  feels_like: number;
  wind: number;
  humidity: number;
  pressure: number;
}

export interface CityForecast {
  city: {
    name: string;
    country: string;
  };
  list: number[];
  currentWeather: CityWeather;
  id: string;
  unit: string;
}

export interface Unit {
  id: string;
  unit: string;
}

export type ChartProps = {
  day: string;
  temp: string;
};
export type ChartType = ChartProps[];
