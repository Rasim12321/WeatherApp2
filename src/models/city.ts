export interface CityData {
  list: City[];
}

export interface City {
  clouds: { all: number };
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  rain: null;
  snow: null;
  sys: { country: string };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}
